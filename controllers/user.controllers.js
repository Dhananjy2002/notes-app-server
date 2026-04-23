import bcrypt from "bcryptjs"
import User from "../models/user.models.js"
import * as jwt from "jsonwebtoken"




async function register(req, res) {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = new User({ email: req.body.email, password: hashed });
    await user.save();
    res.json({ message: "User created" });
}

async function login(req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User not found");

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).send("Invalid password");

    const token = jwt.sign({ id: user._id }, "secretkey");
    res.json({ token });
}

export { register, login };