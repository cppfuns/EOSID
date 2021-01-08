import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

export const SETTINGS_KEY = 'settings';

@Entity(SETTINGS_KEY)
export class SettingsModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id = undefined;

  @Column('varchar', { nullable: true })
  accountId = '';

  @Column('varchar')
  chainId = '';

  @Column('boolean')
  accountPincodeEnabled = false;

  @Column('boolean')
  appPincodeEnabled = false;

  constructor(data) {
    super();
    if (data) {
      const {
        id,
        accountId = '',
        chainId = '',
        accountPincodeEnabled = false,
        appPincodeEnabled = false
      } = data;

      this.id = id;
      this.accountId = accountId;
      this.chainId = chainId;
      this.accountPincodeEnabled = accountPincodeEnabled;
      this.appPincodeEnabled = appPincodeEnabled;
    }
  }

  static get placeholder() {
    return new SettingsModel();
  }
}
