const bcrypt = require('bcrypt');
const userModel = require('../models/user.model'); 
const jwt = require('jsonwebtoken')

class UserService {
    static async userRegister(name, email, password) {
        try {

            const user = await userModel.findOne({email})
            if(user) throw new Error("user exits with the email")

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new userModel({
                name,
                email,
                password: hashedPassword,
            });

            await newUser.save();

            return jwt.sign(
                {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
            )
        } catch (error) {
            console.error('Error registering user:', error);
            throw new Error('User registration failed');
        }
    }


    static async generateToken(email, password) {
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                throw new Error('Invalid email or password');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid email or password');
            }

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                },
                process.env.JWT_SECRET, 
                { expiresIn: '1h' } 
            );

            return { token };
        } catch (error) {
            console.error('Error generating token:', error);
            throw new Error(error.message || 'Authentication failed');
        }
    }
}

module.exports = UserService;
