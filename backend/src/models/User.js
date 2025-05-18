import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';


dotenv.config();
const userSchema  = new mongoose.Schema({

    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }],
    timestamps: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre('save', async function(next) {
    try{
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
    }catch (error) {
    next(error);
    }
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new Error('Unable to login');
    }
    console.log(password);
    console.log(user.password);
    const ismatched = await bcrypt.compare(password, user.password);
    console.log(ismatched);
    if (!ismatched) {
        throw new Error('Unable to login');
    }
    return user;

}
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '5hr' });

    user.tokens = user.tokens.concat({ token });
    if (user.tokens.length > 3) {
        user.tokens = user.tokens.slice(user.tokens.length - 3);
    }
    await user.save();
    return token;
}
const User = mongoose.model("User", userSchema);
export default User;