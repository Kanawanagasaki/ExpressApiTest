import { Sequelize } from "sequelize-typescript";
import { Order } from "../models/OrderModel";
import { User } from "../models/UserModel";

export class SqliteService {
    private static _instance: SqliteService;

    private _sequelize: Sequelize;

    public async init() {
        this._sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'database.sqlite',
            models: [User, Order]
        });

        try {
            await this._sequelize.authenticate();
            console.log('SQLite connection has been established successfully');

            await this._sequelize.sync();
            console.log('Done: sync');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    public static getInstance() {
        if (!this._instance)
            this._instance = new SqliteService();
        return this._instance;
    }
}