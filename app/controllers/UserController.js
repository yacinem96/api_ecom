const User = require('../models/User');
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send("User not found")
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
exports.getUserByToken = async (req, res) => {
    try {
        const token = req.params.token;
        const user = await User.findOne({token});
        if (!user) {
            return res.status(404).send("User not found")
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.addUser = async (req, res) => {
    try {
        const { email, username, password, role } = req.body;
        if (!((email || username) && password)) {
            return res.status(400).send("all inputs are required")
        }
        const newUserName = email || username;
        const existUser = await User.findOne({ $or: [{ email: newUserName }, { username: newUserName }] });
        if (existUser) return res.status(409).send("email or username already exist");

        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: encryptedPassword, role });
        await newUser.save();
        res.status(201).json({ msg: "User created", data: newUser });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.removeUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User not found")
        }
        await User.deleteOne({ _id: req.params.id });
        res.status(200).send("User deleted");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        let uPassword = password;
        uPassword && (uPassword = await bcrypt.hash(password, 10));
        await User.findByIdAndUpdate(
            { _id: req.params.id },
            { email, username, password: uPassword },
            { new: true, useFindAndModify: false }
        );
        res.status(200).send("User updated");
    } catch (err) {
        res.status(500).send(err.message);
    }
}