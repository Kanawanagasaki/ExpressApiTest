import { Table, Column, Model, HasMany } from 'sequelize-typescript'
import { DataType } from 'sequelize-typescript/dist/sequelize/data-type/data-type';
import { Order } from './OrderModel';

@Table
export class User extends Model {
    @Column(DataType.TEXT)
    declare name: string;

    @Column(DataType.TEXT)
    declare password: string;

    @HasMany(() => Order)
    declare hobbies: Order[]
}
