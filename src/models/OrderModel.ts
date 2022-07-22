import { Table, Column, Model, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { DataType } from 'sequelize-typescript/dist/sequelize/data-type/data-type';
import { User } from './UserModel';

@Table
export class Order extends Model {
    @Column(DataType.TEXT)
    declare description: string;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;
}