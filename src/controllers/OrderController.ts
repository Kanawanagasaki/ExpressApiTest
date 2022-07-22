import { Router } from "express";
import { Order } from "../models/OrderModel";
import { User } from "../models/UserModel";

export const router = Router();

router.get("/", async (req, res) => {
    const page = parseInt((req.query.page || "1").toString());
    const limit = 12;
    const skip = (page - 1) * limit;

    const orders = await Order.findAll({ offset: skip, limit: limit });
    const count = await Order.count();
    res.json({ items: orders, count: count, page: page, totalPages: Math.ceil(count / limit) });
});

router.get("/:id", async (req, res) => {
    const orderId = req.params.id;

    const order = await Order.findOne({ where: { id: orderId } });
    if (order)
        res.json(order);
    else res.sendStatus(404);
});

router.get("/byuser/:id", async (req, res) => {
    const userId = req.params.id;

    const orders = await Order.findAll({ where: { userId: userId } });
    res.json(orders);
});

router.post("/", async (req, res) => {
    const userId = (req.session as any).userId;
    if (!userId) {
        res.sendStatus(401);
        return;
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
        res.sendStatus(403);
        return;
    }

    const description = req.body.description;
    const order = await Order.create({ userId: userId, description: description });
    res.json(order);
});

router.put("/:id", async (req, res) => {
    const userId = (req.session as any).userId;
    if (!userId) {
        res.sendStatus(401);
        return;
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
        res.sendStatus(403);
        return;
    }

    const orderId = req.params.id;

    const order = await Order.findOne({ where: { id: orderId } });
    if (order.userId != user.id) {
        res.sendStatus(403);
        return;
    }
    if (order) {
        order.update({ description: req.body.description });
        res.json(order);
    }
    else res.sendStatus(404);
});

router.delete("/:id", async (req, res) => {

    const userId = (req.session as any).userId;
    if (!userId) {
        res.sendStatus(401);
        return;
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
        res.sendStatus(403);
        return;
    }

    const orderId = req.params.id;

    const order = await Order.findOne({ where: { id: orderId } });
    if (order.userId != user.id) {
        res.sendStatus(403);
        return;
    }
    if (order) {
        order.destroy();
        res.sendStatus(204);
    }
    else res.sendStatus(404);
});
