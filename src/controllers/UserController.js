const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET_KEY = "your-secret-key";

class UserController {

    async getAll(req,res){
      try {
        const users = await User.findAll()
        res.status(200).json(users)
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Não foi possivel Listar os usuarios" });
      }
    }
    async getEmail(req,res){
      try {
        const {email} = req.body
        const user = await User.findOne({email:email})
        if(!user){
          res.status(401).json({ error: "Não há nenhum usuario com esse email" });
        }
        res.status(200).json(user)
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Não foi possivel Exibir o usuario" });
      }
    }
    async getUserName(req,res){
      try {
        const {username} = req.body
        const user = await User.findOne({username:username})
        if(!user){
          res.status(401).json({ error: "Não há nenhum usuario com esse username" });
        }
        res.status(200).json(user)
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Não foi possivel Exibir o usuario" });
      }
    }

    async register(req, res) {
        const { username, password, email } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                username: username,
                email: email,
                password: hashedPassword,
            });
            res.status(201).json({ message: "User created", user });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "User creation failed" });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ where: { username } });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { id: user.id, username: user.username },
                SECRET_KEY,
                {
                    expiresIn: "1h",
                }
            );

            res.status(200).json({ token });
        } catch (error) {
            res.status(400).json({ error: "Login failed" });
        }
    }

    async update(req, res) {
        const { newPassword } = req.body;

        try {
            const user = await User.findByPk(req.user.id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();

            res.status(200).json({ message: "Password updated" });
        } catch (error) {
            res.status(400).json({ error: "Update failed" });
        }
    }

    async delete(req, res) {
        try {
            const user = await User.findByPk(req.user.id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            await user.destroy();
            res.status(200).json({ message: "User deleted" });
        } catch (error) {
            res.status(400).json({ error: "Delete failed" });
        }
    }
}

module.exports = new UserController();
