import { Router } from "express";
import { User } from "../models/UserModel";

export const router = Router();

const crypto = require('crypto');

router.get("/", async (req, res) => {
    if ((req.session as any).userId) {
        const user = await User.findOne({ where: { id: (req.session as any).userId } });
        if (user)
            res.json(user);
        else res.sendStatus(401);
    }
    else res.sendStatus(401);
});

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.sendStatus(400);
        return;
    }

    const passwordMd5 = crypto.createHash('md5').update(password).digest("hex");
    const user = await User.findOne({ where: { name: username, password: passwordMd5 } });
    if (user) {
        (req.session as any).userId = user.id;
        res.json(user);
    }
    else res.sendStatus(401);
});

router.post("/signup", async (req, res) => {
    const username = req.body.username;

    const checkUser = await User.findOne({ where: { name: username } });
    if (checkUser) {
        res.status(409).send("User already exists");
        return;
    }

    const password = req.body.password;
    const password2 = req.body.password2;

    if (!username || !password) {
        res.sendStatus(400);
        return;
    }

    if (password != password2) {
        res.status(400).send("Passwords must match");
        return;
    }

    const passwordMd5 = crypto.createHash('md5').update(password).digest("hex");
    const user = await User.create({ name: username, password: passwordMd5 });
    (req.session as any).userId = user.id;
    res.json(user);
});


router.post("/logout", async (req, res) => {
    delete (req.session as any).userId;
    res.sendStatus(204);
});