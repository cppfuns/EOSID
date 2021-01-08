import { observable, action, computed } from 'mobx';

import AccountService from '../services/AccountService';
import TransferLogService from '../services/TransferLogService';

import NetworkStore from './NetworkStore';
import SettingsStore from './SettingsStore';

import api from '../utils/eos/API';
import TokenContracts from '../constants/TokenContracts';

class AccountStore {
  @observable
  accounts = [];

  @observable
  info = {};
  /**
   * { EOS: 100.3213, JUNGLE: 0.1231 }
   */
  @observable
  tokens = {};

  @observable
  actions = [];

  @observable
  lastestActionSeq = 0;

  @observable
  fetched = false;

  findAccount(accountName) {
    if (!accountName) {
      return this.currentAccount;
    }

    const foundAccount = this.accounts.find(
      account => account.name === accountName
    );
    if (!foundAccount) {
      throw new Error(
        `not found ${accountName}, import '${accountName}' account`
      );
    }
    return foundAccount;
  }

  @computed
  get currentAccount() {
    const { accountId, chainId } = SettingsStore.settings;
    let accounts = this.accounts.filter(account => account.chainId === chainId);
    let account = accounts.find(account => account.id === accountId);
    if (!account && accounts.length) {
      account = accounts[0];
    }
    return account;
  }

  @action
  async changeCurrentAccount(accountId, chainId, networkId) {
    if (!chainId) {
      chainId = SettingsStore.settings.chainId;
    }
    if (!accountId && this.accounts) {
      accountId = (
        this.accounts.find(account => account.chainId === chainId) || {}
      ).id;
    }

    if (
      !accountId ||
      accountId !== (this.currentAccount && this.currentAccount.accountId)
    ) {
      // update settings
      await SettingsStore.updateSettings({ accountId, chainId });

      // set current network
      NetworkStore.setCurrentNetwork(this.currentAccount, chainId, networkId);
      // fetch account info
      await this.getAccountInfo();
    }
  }

  @action
  setAccounts(accounts) {
    this.accounts = accounts;
  }

  @action
  async getAccounts(chainId) {
    return AccountService.getAccounts().then(accounts => {
      this.setAccounts(accounts);
      if (chainId) {
        return this.accounts.filter(account => account.chainId === chainId);
      }
      return accounts;
    });
  }

  @action
  async addAccount(accountInfo) {
    return AccountService.addAccount({
      ...accountInfo
    }).then(async account => {
      // remove duplicate entity
      const accounts = this.accounts.filter(
        entity =>
          entity.name !== account.name || entity.chainId !== account.chainId
      );
      accounts.push(account);

      this.setAccounts(accounts);
      await this.changeCurrentAccount(account.id, account.chainId);
      await this.getAccountInfo();
    });
  }

  @action
  async updateEncryptedKeys(prevPincode, newPincode) {
    return AccountService.updateEncryptedKeys(prevPincode, newPincode).then(
      accounts => {
        this.setAccounts(accounts);
      }
    );
  }

  @action
  async removeAccount(accountId) {
    return AccountService.removeAccount(accountId).then(_ => {
      const filterDeletedAccount = this.accounts.filter(
        account => account.id !== accountId
      );

      this.setAccounts(filterDeletedAccount);
      this.changeCurrentAccount(
        this.accounts.length ? this.accounts[0].id : '',
        this.accounts.length ? this.accounts[0].chainId : ''
      );
    });
  }

  @action
  async getAccountInfo() {
    this.info = {};
    this.tokens = {};
    this.actions = [];
    this.fetched = false;

    if (!this.currentAccount) {
      this.fetched = true;
      return;
    }

    await Promise.all([this.getInfo(), this.getTokens(), this.getActions()]);

    this.fetched = true;
  }

  async getInfo() {
    const account = this.currentAccount;
    const info = await api.accounts.get({ account_name: account.name });

    this.info = info;
  }

  async getTokens() {
    const account = this.currentAccount;
    const { chainId } = SettingsStore.settings;

    if (!Object.keys(this.tokens).length) {
      this.tokens = {
        EOS: { amount: '0.0000', code: 'eosio.token' }
      };
    }

    TokenContracts[chainId].forEach(async contract => {
      const balances = await api.currency.balance({
        code: contract,
        account: account.name
      });
      if (balances && balances.length) {
        const tokens = balances.reduce((ac, v) => {
          const [amount, symbol] = v.split(' ');
          const precision = amount.split('.')[1].length;
          return { ...ac, [symbol]: { amount, code: contract, precision } };
        }, {});
        this.tokens = {
          ...this.tokens,
          ...tokens
        };
      }
    });
  }

  async getActions(page = 1) {
    const account = this.currentAccount;

    const { actions: lastestActions = [] } =
      (await api.actions.getsLastest({
        account_name: account.name
      })) || {};

    const lastestSeq = lastestActions.length
      ? lastestActions[0].account_action_seq
      : 0;

    let { actions = [] } = await api.actions.gets({
      account_name: account.name,
      lastestSeq,
      page
    });

    actions = actions.filter(action =>
      action.action_trace.act.data && action.action_trace.act.data.to
        ? action.action_trace.receipt.receiver === account.name
        : action.action_trace.receipt.receiver ===
        action.action_trace.act.account
    );

    // when refresh actions
    if (page === 1) {
      this.actions = actions.reverse();
    } else {
      this.actions = [...this.actions, ...actions.reverse()];
    }

    this.lastestActionSeq = lastestSeq;
  }

  @action
  async transfer(params) {
    const { id, name } = this.currentAccount;
    // const { permission = 'active' } = params;
    const key = AccountService.getKey(this.currentAccount);

    return AccountService.transfer({
      ...params,
      from: name,
      encryptedPrivateKey: key.encryptedPrivateKey,
      permission: key.permission
    }).then(async tx => {
      await this.getTokens();
      this.getActions();
      // log transfer
      TransferLogService.addTransferLog({ ...params, accountId: id });

      return tx;
    });
  }

  @action
  async manageResource(params) {
    const { name } = this.currentAccount;
    // const { permission = 'active' } = params;
    const key = AccountService.getKey(this.currentAccount);

    return AccountService.manageResource({
      ...params,
      from: name,
      encryptedPrivateKey: key.encryptedPrivateKey,
      permission: key.permission
    }).then(async tx => {
      await this.getInfo();
      await this.getTokens();
      this.getActions();

      return tx;
    });
  }
}

export default new AccountStore();
