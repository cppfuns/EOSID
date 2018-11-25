import { observable, action, computed } from 'mobx';

import NetworkService from '../services/NetworkService';

import { DEFAULT_NETWORKS, DEFAULT_CHAIN } from '../constants';
import Chains from '../constants/Chains';

import api from '../utils/eos/API';

class Store {
  @observable
  chains = Chains.reduce((ac, chain) => {
    ac[chain.id] = chain;
    return ac;
  }, {});

  @observable
  defaultNetworks = DEFAULT_NETWORKS;

  @observable
  customNetworks = [];

  @observable
  currentNetwork = this.defaultNetworks[0];

  @observable
  currentChain = DEFAULT_CHAIN;

  @computed
  get allNetworks() {
    return [...this.defaultNetworks, ...this.customNetworks];
  }

  @action
  getNetwork(chainId) {
    if (
      chainId &&
      (!this.currentNetwork.nodes || this.currentNetwork.chainId !== chainId)
    ) {
      const chain = this.chains[chainId];
      this.currentNetwork = chain.nodes
        ? chain.nodes[0]
        : this.defaultNetworks[0];
    } else {
      this.currentNetwork =
        (this.chains[chainId || this.currentChain || 0].nodes || [])[0] ||
        this.defaultNetworks[0];
    }

    return this.currentNetwork;
  }

  @action
  setCurrentNetwork(account) {
    api.currentNetwork = this.getNetwork(account && account.chainId);
  }

  @action
  changeNetwork(chainId, networkId) {
    const network = this.chains[chainId].nodes.find(
      node => node.id === networkId
    );
    this.currentNetwork = network;
    api.currentNetwork = network;
  }

  @action
  setChains(chains) {
    this.chains = chains;
  }

  @action
  setDefaultNetworks(networks) {
    this.defaultNetworks = networks;
  }

  @action
  setCustomNetworks(networks) {
    this.customNetworks = networks;
  }

  @action
  async getNetworks() {
    return await NetworkService.getNetworks(this.chains).then(chains => {
      this.setChains(chains);
    });
  }

  @action
  async addNetwork(networkInfo) {
    return NetworkService.addNetwork({
      ...networkInfo
    }).then(network => {
      this.setCustomNetworks([...this.customNetworks, network]);
    });
  }

  @action
  async removeNetwork(networkId) {
    return NetworkService.removeNetwork(networkId).then(_ => {
      const filterDeletedNetwork = this.customNetworks.filter(
        network => network.id !== networkId
      );
      this.setCustomNetworks(filterDeletedNetwork);
    });
  }
}

export default new Store();
