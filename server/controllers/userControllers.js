const userDb = require("../model/userModel");
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    try {

        const { name, email, mobile, password } = req.body

        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const userAlreadyExist = await userDb.findOne({ email })

        if (userAlreadyExist) {
            return res.status(400).json({ error: 'user Already exist' })
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new userDb({
            name, email, password: hashedPassword, mobile
        })

        const savedUser = await newUser.save()


        res.status(200).json({ message: "User created successfully", savedUser })

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: 'All feilds are required' })
        }

        const user = await userDb.findOne({ email })

        if (!user) {
            return res.status(400).json({ error: 'User not exist' })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        console.log(passwordMatch, "passwordMatch");

        if (!passwordMatch) {
            return res.status(400).json({ error: 'Incorrect password' })
        }




        res.status(200).json({ message: "login successfull" })

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" })
    }
}

module.exports = { register, login }