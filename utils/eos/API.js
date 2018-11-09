import { Api, JsSignatureProvider, JsonRpc, RpcError } from 'eosjs-rn';
import ecc from 'eosjs-ecc-rn';
import { TextDecoder, TextEncoder } from 'text-encoding';
import { AccountStore, NetworkStore } from '../../stores';
import { AccountService } from '../../services';
import Fetch from '../Fetch';

class EosApi {
  static FetchChain = null;
  static FetchHistory = null;
  static isJungleNet = false;

  static API(url, fetchAPI) {
    if (!fetchAPI || fetchAPI.baseURL !== url) {
      fetchAPI = new Fetch({ baseURL: url });
    }
    return fetchAPI;
  }

  static ChainAPI(url) {
    if (url) {
      return new Fetch({ baseURL: url });
    }
    const network = NetworkStore.currentNetwork;
    EosApi.FetchChain = EosApi.API(network.chainURL, EosApi.FetchChain);
    return EosApi.FetchChain;
  }

  static HistoryAPI(url) {
    if (url) {
      return new Fetch({ baseURL: url });
    }
    const network = NetworkStore.currentNetwork;
    EosApi.FetchHistory = EosApi.API(network.historyURL, EosApi.FetchHistory);
    return EosApi.FetchHistory;
  }

  static get Rpc() {
    const network = NetworkStore.currentNetwork;
    return new JsonRpc(network.chainURL, { fetch });
  }

  static getApi({
    accountName,
    privateKey,
    pincode,
    permission = 'active'
  } = {}) {
    const network = NetworkStore.currentNetwork;
    if (!privateKey && pincode) {
      const account = AccountStore.findAccount(accountName);
      const key = AccountService.getKey(account, permission);
      privateKey = AccountService(key.encryptedPrivateKey, pincode);
    }

    const signatureProvider = new JsSignatureProvider([privateKey]);

    return new Api({
      chainId: network.chainId,
      rpc: EosApi.Rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder()
    });
  }

  static get accounts() {
    return {
      get: ({ account_name, url }) =>
        EosApi.ChainAPI(url).post('/v1/chain/get_account', { account_name }),
      getsByPublicKey: (public_key, url) =>
        EosApi.HistoryAPI(url).post('/v1/history/get_key_accounts', {
          public_key
        }),
      getControlledAccounts: ({ controlling_account }) =>
        EosApi.HistoryAPI().post('/v1/history/get_controlled_accounts', {
          controlling_account
        })
    };
  }

  static get currency() {
    return {
      balance: ({ code = 'eosio.token', account, symbol }) =>
        EosApi.ChainAPI().post('/v1/chain/get_currency_balance', {
          code,
          account,
          symbol
        }),
      stats: ({ code = 'eosio.token', symbol = 'EOS' }) =>
        EosApi.ChainAPI().post('/v1/chain/get_currency_stats', {
          code,
          symbol
        }),
      precision: ({ account = 'eosio.token', symbol = 'EOS' }) => {
        if (symbol === 'EOS') {
          return 4;
        }
        const stats = EosApi.currency.stats({ code: account, symbol });
        const supplyBalance = stats[symbol].max_supply.split(' ')[0];
        return supplyBalance.split('.')[1].length;
      }
    };
  }
  static get transactions() {
    return {
      get: ({ id }) =>
        EosApi.HistoryAPI().post('/v1/history/get_transaction', { id }),
      getRequiredKeys: ({ transaction, available_keys }) =>
        EosApi.ChainAPI().post('/v1/chain/get_required_keys', {
          transaction,
          available_keys
        }),
      gets: ({ scope, code, table, json, lower_bound, upper_bound, limit }) =>
        EosApi.ChainAPI().post('/v1/chain/get_table_rows', {
          scope,
          code,
          table,
          json,
          lower_bound,
          upper_bound,
          limit
        }),
      validateData: async params => {
        const { account, name } = params;
        const result = await EosApi.abi.get({ account_name: account });
        if (!result.abi) {
          throw new Error('not found contract code');
        }

        const struct = result.abi.structs.find(struct => struct.name === name);

        if (!struct) {
          throw new Error('action and code not match');
        }

        const data = {};
        struct.fields.forEach(field => {
          if (!params.hasOwnProperty(field.name)) {
            throw new Error(
              `${field.name} is required, ${field.name} parameter missing`
            );
          }
          if (field.type === 'extended_asset') {
            data[field.name] = {
              quantity: params[field.name],
              contract: account
            };
          } else {
            data[field.name] = params[field.name];
          }
        });
        return data;
      },
      validateAuthorization: params => {
        let { actor, permission = 'active' } = params;

        if (!actor) {
          const foundAccount = AccountStore.findAccount();
          actor = foundAccount.name;
        }

        const authorization = [];
        authorization.push({ actor, permission });
        return authorization;
      },
      transaction: async ({
        broadcast = true,
        blocksBehind = 3,
        expireSeconds = 30,
        ...params
      }) => {
        try {
          const { account, name } = params;
          const data = await this.transactions.validateData(params);
          const authorization = this.transactions.validateAuthorization(params);

          const accountName = params.actor ? params.actor : params.from;

          return await EosApi.getApi({ ...params, accountName }).transact(
            { actions: [{ account, name, authorization, data }] },
            { broadcast, blocksBehind, expireSeconds }
          );
        } catch (e) {
          console.log(`\nCaught exception: ${e}`);
          console.log(e);
          throw e;
        }
      },
      transfer: params => {
        let {
          account = 'eosio.token',
          name = 'transfer',
          symbol = 'EOS',
          amount = 0
        } = params;

        if (amount <= 0) {
          throw new Error('must transfer positive quantity');
        }

        if (!params.from) {
          const foundAccount = AccountStore.findAccount();
          params.from = foundAccount.name;
        }

        if (!params.actor && params.from) {
          params.actor = params.from;
        }

        symbol = symbol.toUpperCase();
        const precision = EosApi.currency.precision({ code: account, symbol });
        const fixedBalance = parseFloat(amount).toFixed(precision);
        params.quantity = `${fixedBalance} ${symbol}`;

        const transaction = { ...params, account, name };

        return this.transactions.transaction(transaction);
      },
      stake: params => {
        let {
          account = 'eosio',
          name = 'delegatebw',
          transfer = true,
          net = 0,
          cpu = 0,
          symbol = 'EOS'
        } = params;

        if (typeof net === 'string') {
          net = parseFloat(net);
        }
        if (typeof cpu === 'string') {
          cpu = parseFloat(cpu);
        }

        if (net <= 0 && cpu <= 0) {
          throw new Error('must should stake positive quantity');
        }

        if (!params.from) {
          const foundAccount = AccountStore.findAccount();
          params.from = foundAccount.name;
        }

        if (!params.receiver) {
          params.receiver = params.from;
        }

        if (params.from === params.receiver) {
          transfer = false;
        }

        if (!params.actor && params.from) {
          params.actor = params.from;
        }

        const precision = EosApi.currency.precision({ symbol });

        net = parseFloat(net).toFixed(precision);
        cpu = parseFloat(cpu).toFixed(precision);

        params.stake_net_quantity = `${net} ${symbol}`;
        params.stake_cpu_quantity = `${cpu} ${symbol}`;

        const transaction = { ...params, account, name, transfer };

        return this.transactions.transaction(transaction);
      },
      unStake: params => {
        let {
          account = 'eosio',
          name = 'undelegatebw',
          transfer = false,
          net = 0,
          cpu = 0,
          symbol = 'EOS'
        } = params;

        if (typeof net === 'string') {
          net = parseFloat(net);
        }
        if (typeof cpu === 'string') {
          cpu = parseFloat(cpu);
        }

        if (net <= 0 && cpu <= 0) {
          throw new Error('must should unstake positive quantity');
        }

        if (!params.from) {
          const foundAccount = AccountStore.findAccount();
          params.from = foundAccount.name;
        }

        if (!params.receiver) {
          params.receiver = params.from;
        }

        if (!params.actor && params.from) {
          params.actor = params.from;
        }

        if (params.from === params.receiver) {
          transfer = false;
        }

        const precision = EosApi.currency.precision({ symbol });

        net = parseFloat(net).toFixed(precision);
        cpu = parseFloat(cpu).toFixed(precision);

        params.unstake_net_quantity = `${net} ${symbol}`;
        params.unstake_cpu_quantity = `${cpu} ${symbol}`;

        const transaction = { ...params, account, name, transfer };

        return this.transactions.transaction(transaction);
      },
      buyRam: params => {
        console.log('buy ram');
      },
      sellRam: params => {
        console.log('sell ram');
      }
    };
  }
  static get actions() {
    return {
      get: ({ pos, offset, account_name }) =>
        EosApi.HistoryAPI().post('/v1/history/get_actions', {
          pos,
          offset,
          account_name
        }),
      getsLastest: ({ account_name }) =>
        EosApi.actions.gets({ pos: -1, offset: -1, account_name }),
      gets: ({ lastestSeq, page = 1, offset = 10, account_name }) => {
        const pos = lastestSeq - page * offset;

        return EosApi.HistoryAPI().post('/v1/history/get_actions', {
          pos,
          offset: offset - 1,
          account_name
        });
      }
    };
  }
  get producers() {
    return {
      get: ({ id }) =>
        EosApi.HistoryAPI().post('/v1/history/get_transaction', { id })
    };
  }
  static get code() {
    return {
      get: ({ account_name }) =>
        EosApi.ChainAPI().post('/v1/chain/get_code', {
          account_name,
          code_as_wasm: true
        })
    };
  }
  static get abi() {
    return {
      get: ({ account_name }) =>
        EosApi.ChainAPI().post('/v1/chain/get_abi', { account_name })
    };
  }
  static get blocks() {
    return {
      get: ({ block_num_or_id }) =>
        EosApi.ChainAPI().post('/v1/chain/block', { block_num_or_id }),
      getHeaderState: ({ block_num_or_id }) =>
        EosApi.ChainAPI().post('/v1/chain/get_block_header_state', {
          block_num_or_id
        })
    };
  }
  static get info() {
    return {
      get: url => EosApi.ChainAPI(url).post('/v1/chain/get_info', {})
    };
  }
  static get Key() {
    return {
      unsafeRandomKey: () => ecc.unsafeRandomKey(),
      /*
      @example
      ecc.randomKey().then(privateKey => {
        console.log('Private Key:\t', privateKey) // wif
        console.log('Public Key:\t', ecc.privateToPublic(privateKey)) // EOSkey...
      })
      */
      randomKey: ({ cpuEntropyBits = 0 }) => ecc.randomKey(cpuEntropyBits),
      /* @example ecc.seedPrivate('secret') === wif */
      seedPrivate: ({ seed }) => ecc.seedPrivate(seed),
      /* @example ecc.privateToPublic(wif) === pubkey */
      privateToPublic: ({ wif, pubkey_prefix = 'EOS' }) =>
        ecc.privateToPublic(wif, pubkey_prefix),
      /* @example ecc.isValidPublic(pubkey) === true */
      isValidPublic: ({ pubkey, pubkey_prefix = 'EOS' }) =>
        ecc.isValidPublic(pubkey, pubkey_prefix),
      /* @example ecc.isValidPrivate(wif) === true */
      isValidPrivate: ({ wif }) => ecc.isValidPrivate(wif)
    };
  }
  static get Sign() {
    return {
      /* @example ecc.sign('I am alive', wif) */
      get: ({ data, privateKey, encoding = 'utf8' }) =>
        ecc.sign(data, privateKey, encoding),
      hash: ({ data, privateKey, encoding = 'utf8' }) =>
        ecc.signHash(data, privateKey, encoding),
      /* @example ecc.verify(signature, 'I am alive', pubkey) === true */
      verify: ({
        signature,
        data,
        pubkey,
        encoding = 'utf8',
        hashData = true
      }) => ecc.verify(signature, data, pubkey, encoding, hashData),
      /* @example ecc.recover(signature, 'I am alive') === pubkey */
      recover: ({ signature, data, encoding = 'utf8' }) =>
        ecc.recover(signature, data, encoding),
      recoverHash: ({ signature, dataSha256, encoding = 'utf8' }) =>
        ecc.recoverHash(signature, dataSha256, encoding)
    };
  }
}

export default EosApi;
