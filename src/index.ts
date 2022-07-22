import { Order } from "./models/OrderModel";
import { User } from "./models/UserModel";
import { Sequelize } from 'sequelize-typescript'
import { SqliteService } from "./services/SqliteService";
import { router as userRouter } from './controllers/UserController';
import { router as orderRouter } from './controllers/OrderController';

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const port = 3000;

app.listen(port, async () => {
    console.log(`Express app is listening on port ${port}`);
    await SqliteService.getInstance().init();
});

app.use(session({
    secret: 'UwUNyaKawaiiDesu',
    saveUninitialized: true
}));
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
