const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        // form validation server side
        if (!((email || username) && password)) {
           return res.status(400).send("all inputs are required");
        }
        const newUserName = email || username;
        // check if user already exist
        const existUser = await User.findOne({ $or: [{ email: newUserName }, { username: newUserName }] });
        if (existUser) {
           return res.status(409).send("email or username already exist");
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: encryptedPassword });
        savedUser = await newUser.save();

        // generate token
        const token = jwt.sign(
            { user_id: savedUser._id, email: email },
            process.env.TOKEN_KEY,
            { expiresIn: "4h" }
        );
        // save user token
        savedUser.token = token;
        await savedUser.save()
        res.status(201).json({ msg: "User created", data: savedUser });

    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.login = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        // form validation server side
        if (!((email || username) && password)) {
            return res.status(400).send("all inputs are required");
        }
        const userName = email || username;
        // check if user exist in db
        const existUser = await User.findOne({ $or: [{ email: userName }, { username: userName }] });
        if (!existUser) {
            return res.status(409).send("inccorect email or username");
        }
        // check if pw is correct
        if (!(await bcrypt.compare(password, existUser.password))) {
            return res.status(410).send("inccorect password");
        }
        // generate token
        const token = jwt.sign(
            { user_id: existUser._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "4h" }
          );
    
          // register user token
          existUser.token = token;
          await existUser.save()
          res.status(200).send(existUser);

    } catch (err) {
        res.status(500).send(err.message)
    }
}

// get my account function
exports.account = async (req, res) => {
    if (req.user) {
      await res.json({ user: req.user });
    } else {
      await res.json({ user: null });
    }
  };
  