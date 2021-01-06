import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export const TRANSFER_LOG_KEY = 'transferlog';

@Entity(TRANSFER_LOG_KEY)
export class TransferLogModel {
  @PrimaryGeneratedColumn('uuid')
  id = undefined;

  @Column('varchar')
  receiver = '';

  @Column('varchar')
  amount = '';

  @Column('varchar')
  symbol = '';

  @Column('varchar')
  accountId = '';

  @Column('varchar')
  createdAt = '';

  constructor(data) {
    if (data) {
      const {
        id,
        receiver,
        amount,
        symbol,
        accountId,
        createdAt = new Date()
      } = data;

      this.id = id;
      this.receiver = receiver;
      this.amount = amount;
      this.symbol = symbol;
      this.accountId = accountId;
      this.createdAt = createdAt;
    }
  }

  static get placeholder() {
    return new TransferLogModel();
  }
}
