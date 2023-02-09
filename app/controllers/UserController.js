const User = require('../models/User');

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
        const User = await User.findById(id);
        if (!User) {
            res.status(404).send("User not found")
        }
        res.status(200).send(User);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.addUser = async (req, res) => {
    try {
        const { email, username, password} = req.body;
        if (!((email || username) && password)) {
            res.status(400).send("all inputs are required")
        }
        const newUserName=email || username;
        existUser= await User.find({$or:[{email:newUserName},{username:newUserName}]});
        existUser && res.status(400).send("email or username already exist");
        const newUser = await new User({ email, username, password});
        newUser.save();
        res.status(201).json({ msg: "User created", data: newUser });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.removeUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).send("User not found")
        }
        await User.deleteOne({ _id: req.params.id });
        res.status(200).send("User deleted");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).send("User not found")
        }
        user.update({$set:{username:req.body.username}});
        user.save();
        res.status(200).send("User updated");
    } catch (err) {
        res.status(500).send(err.message);
    }
}