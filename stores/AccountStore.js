import { observable, action, computed } from 'mobx';

import { AccountService, TransferLogService } from '../services';

import { SettingsStore, PincodeStore } from './';

import api from '../utils/eos/API';

class Store {
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
    const { accountId } = SettingsStore.settings;

    return this.accounts.find(account => account.id === accountId);
  }

  @action
  async changeCurrentAccount(accountId) {
    if (accountId !== (this.currentAccount && this.currentAccount.accountId)) {
      // update settings
      await SettingsStore.updateSettings({ accountId });
      // fetch account info
      await this.getAccountInfo();
    }
  }

  @action
  setAccounts(accounts) {
    this.accounts = accounts;
  }

  @action
  async getAccounts() {
    return AccountService.getAccounts().then(accounts => {
      this.setAccounts(accounts);
    });
  }

  @action
  async addAccount(accountInfo) {
    return AccountService.addAccount({
      ...accountInfo,
      pincode: PincodeStore.accountPincode
    }).then(async account => {
      //remove duplicate entity
      this.accounts = this.accounts.filter(entity => entity.id !== account.id);
      this.accounts.push(account);
      await this.setAccounts(this.accounts);
      await this.changeCurrentAccount(account.id);
      this.getAccountInfo();
    });
  }

  @action
  async removeAccount(accountId) {
    return AccountService.removeAccount(accountId).then(_ => {
      const filterDeletedAccount = this.accounts.filter(
        account => account.id !== accountId
      );

      this.setAccounts(filterDeletedAccount);
      this.changeCurrentAccount(
        this.accounts.length ? this.accounts[0].id : ''
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

    const tokens = await api.currency.balance({ account: account.name });

    this.tokens = {
      EOS: '0.0000',
      ...tokens.reduce((ac, v) => {
        const [amount, symbol] = v.split(' ');
        return { ...ac, [symbol]: amount };
      }, {})
    };
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

    const { actions = [] } = await api.actions.gets({
      account_name: account.name,
      lastestSeq,
      page
    });

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
    const { permission = 'active' } = params;
    const key = AccountService.getKey(this.currentAccount, permission);

    return AccountService.transfer({
      ...params,
      sender: name,
      encryptedPrivateKey: key.encryptedPrivateKey,
      pincode: PincodeStore.accountPincode
    }).then(async tx => {
      // fetch lastets tokens
      await this.getTokens();
      // log transfer
      TransferLogService.addTransferLog({ ...params, accountId: id });

      return tx;
    });
  }

  @action
  async manageResource(params) {
    const { name } = this.currentAccount;
    const { permission = 'active' } = params;
    const key = AccountService.getKey(this.currentAccount, permission);

    return AccountService.manageResource({
      ...params,
      sender: name,
      encryptedPrivateKey: key.encryptedPrivateKey,
      pincode: PincodeStore.accountPincode
    }).then(async tx => {
      await this.getInfo();
      await this.getTokens();

      return tx;
    });
  }
}

export const AccountStore = new Store();
