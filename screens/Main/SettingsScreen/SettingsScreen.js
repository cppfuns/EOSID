import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import {
  Appbar,
  Caption,
  Text,
  TouchableRipple,
  Colors,
  Button,
  Switch
} from 'react-native-paper';
import { Icon } from 'expo';

import HomeStyle from '../../../styles/HomeStyle';

const Section = ({ title, children }) => (
  <View>
    <Caption
      style={{
        marginVertical: 0,
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: Colors.grey200
      }}
    >
      {title}
    </Caption>
    {children}
  </View>
);

const Item = ({ title, description, onPress, children }) => (
  <TouchableRipple
    style={{ padding: 15, borderBottomWidth: 1, borderColor: Colors.grey200 }}
    onPress={onPress}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ flex: 1 }}>{title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {description && (
          <Text style={{ marginRight: 15, color: Colors.grey700 }}>
            {description}
          </Text>
        )}

        {children ? (
          children
        ) : (
          <Icon.Ionicons
            size={18}
            color={Colors.grey700}
            name="ios-arrow-forward"
          />
        )}
      </View>
    </View>
  </TouchableRipple>
);

@inject('accountStore', 'settingsStore')
@observer
export class SettingsScreen extends Component {
  @observable
  appPincodeEnabled = this.props.settingsStore.settings.appPincodeEnabled;

  toggleAppPincode = () => {
    const { settingsStore, navigation } = this.props;

    this.appPincodeEnabled = !this.appPincodeEnabled;

    // tricky - when navigate back to settings
    setTimeout(() => {
      this.appPincodeEnabled = !this.appPincodeEnabled;
    }, 1000);

    // check app pincode is enabled
    if (settingsStore.settings.appPincodeEnabled) {
      navigation.navigate('ConfirmAppPin', {
        cb: async () => {
          await settingsStore.updateSettings({ appPincodeEnabled: false });
          this.appPincodeEnabled = false;
        }
      });
    } else {
      navigation.navigate('NewAppPin', {
        cb: () => {
          this.appPincodeEnabled = true;
        }
      });
    }
  };

  signOut = () => {
    this.moveScreen('Auth');
  };

  moveScreen = routeName => this.props.navigation.navigate(routeName);

  render() {
    const { currentAccount } = this.props.accountStore;
    const { settings } = this.props.settingsStore;

    return (
      <View style={HomeStyle.container}>
        <SafeAreaView style={HomeStyle.container}>
          <Appbar.Header>
            <Appbar.Content title="Settings" />
          </Appbar.Header>
          <ScrollView style={HomeStyle.container}>
            <Section title="User Settings">
              <Item
                title="Accounts"
                description={currentAccount && currentAccount.name}
                onPress={() => this.moveScreen('Accounts')}
              />
            </Section>
            <Section title="App Settings">
              <Item
                title="Networks"
                onPress={() => this.moveScreen('SettingsNetwork')}
              />
              <Item title="Language" />
              <Item title="App Pincode" onPress={this.toggleAppPincode}>
                <Switch
                  value={this.appPincodeEnabled}
                  onValueChange={this.toggleAppPincode}
                />
              </Item>
            </Section>
            <Section title="App Info">
              <Item title="Support" />
            </Section>

            {settings.appPincodeEnabled && (
              <Button
                style={{ padding: 5, marginTop: 15 }}
                color={Colors.red500}
                onPress={this.signOut}
              >
                Sign out
              </Button>
            )}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}