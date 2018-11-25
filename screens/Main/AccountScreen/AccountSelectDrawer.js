import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { SafeAreaView, View, Platform, Text } from 'react-native';
import { Constants, Icon } from 'expo';
import { withNavigation } from 'react-navigation';
import { Portal, Modal, TouchableRipple } from 'react-native-paper';

import { Theme } from '../../../constants';

import { ScrollView } from '../../../components/View';
import Chains from '../../../constants/Chains';

@withNavigation
@inject('accountStore')
@observer
export class AccountSelectDrawer extends Component {
  @observable
  visible = false;

  changeAccount(accountId, chainId) {
    this.props.onHide();
    this.props.accountStore.changeCurrentAccount(accountId, chainId);
  }

  moveScreen() {
    this.props.onHide();
    this.props.navigation.navigate('ImportAccount');
  }

  render() {
    const { visible, onHide = () => null } = this.props;
    const { currentAccount, accounts } = this.props.accountStore;

    const ListItem = ({
      title,
      dark,
      style,
      right,
      onPress = () => null,
      onLongPress = () => null
    }) => (
      <TouchableRipple
        style={{
          padding: 20,
          ...style
        }}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 1, fontSize: 17, color: dark && '#fff' }}>
            {title}
          </Text>
          {right}
        </View>
      </TouchableRipple>
    );

    return (
      <Portal>
        <Modal visible={visible} onDismiss={() => onHide()}>
          <SafeAreaView
            style={{
              position: 'absolute',
              top: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
              left: 0,
              right: 0,
              marginVertical: 0,
              backgroundColor: Theme.mainBackgroundColor
            }}
          >
            <ScrollView>
              {accounts.map(({ id, name, chainId }) => (
                <ListItem
                  key={id}
                  title={`${name} - ${
                    Chains.find(chain => chain.id === chainId).name
                  }`}
                  right={
                    currentAccount &&
                    name === currentAccount.name &&
                    chainId === currentAccount.chainId && (
                      <Icon.Ionicons
                        name="md-checkmark"
                        color={Theme.primary}
                        size={25}
                      />
                    )
                  }
                  onPress={() => this.changeAccount(id, chainId)}
                />
              ))}

              <ListItem
                dark
                style={{ backgroundColor: Theme.primary }}
                title="Import Account"
                right={<Icon.Ionicons name="md-add" color="#fff" size={30} />}
                onPress={() => this.moveScreen()}
              />
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </Portal>
    );
  }
}
