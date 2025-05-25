import User from '../models/User.js';


import jwt from 'jsonwebtoken';

/*
    @desc Register a new user
    @route POST /auth/register
    @access Public
*/

export const register = async (req,res) =>{
    try{
        
    const { name, email, password } = req.body;
    email = email.toLowerCase();

    // check if user already exists 
    const existingUser = await User.findOne({email});
    if (existingUser) {
        console.log(existingUser);
        return res.status(400).json({ message: 'User already exists' });
    }

    // create new user
    const user = new User({
        name,
        email,
        password,
    })
    await user.save();
    return res.status(201).json({ message: 'User created successfully' });

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


export const login = async (req,res) =>{
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ message: 'No user found please register yourserlf' });

        }
        const loginuser = await User.findByCredentials(email, password);
        if (!loginuser) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // generate token
        await user.generateAuthToken();
        return res.status(200).json({ message: 'User logged in successfully', token: user.tokens[user.tokens.length - 1].token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        
    }
}

// export const logout = async (req,res) =>{
//     try {
//         req.user.tokens = req.user.tokens.filter((token) =>{
//             return token.token !== req.token;
//         });
//         await req.user.save();

//         res.status(200).json({ message: 'User logged out successfully' });
        
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
        
//     }
// }

export const getMe = async (req,res) =>{
    try {
        const user = await User.findById(req.user._id).select('-password -tokens');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        
    }
}