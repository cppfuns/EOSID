import { createConnection } from 'typeorm';

import { NetworkModel } from './NetworkModel';
import { AccountModel } from './AccountModel';
import { TransferLogModel } from './TransferLogModel';
import { SettingsModel } from './SettingsModel';

export const initializeDB = () =>
  createConnection({
    database: 'eosid',
    driver: require('expo-sqlite'),
    entities: [NetworkModel, AccountModel, TransferLogModel, SettingsModel],
    synchronize: true,
    type: 'expo'
  });
