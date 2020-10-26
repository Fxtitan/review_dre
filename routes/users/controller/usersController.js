const User = require('../model/User')
const bcrypt = require('bcryptjs')

module.exports = {
    createUser: async (req, res) => {
        let email = req.body.email
        let password = req.body.password
        let user = await User.findOne({email: email})
        if(user) return res.status(400).json({messsage: "email already used"})
        let salt = await bcrypt.salt(10)
        let hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            email: email,
            password: hashPassword
        })
        await newUser.save()
        return res.json(newUser)
      },
    loginUser: async (req, res)=>{

    }
}