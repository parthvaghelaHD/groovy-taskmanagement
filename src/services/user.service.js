import bcrypt from 'bcryptjs';
import UserModel from '../models/user.model.js';
import { generateAccessToken } from '../helpers/jwt.helper.js';

const add = async (param) => {
    const newUser = new UserModel(param);
    delete newUser.password;
    return await newUser.save();
};

const login = async ({ email, password }) => {
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (user && !bcrypt.compareSync(password, user.password)) {
        return { msg: 'inCorrect' };
    } else if (!user) {
        return { msg: 'notFound' };
    } else if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateAccessToken({
            email,
            _id: user._id,
            username: user.first_name + ' ' + user.last_name,
        });
        return { ...user.toJSON(), token };
    }
    return true;
};

const getUser = async (query) => {
    const user = await UserModel.findOne({ email: query.email.toLowerCase() });
    if (user) {
        return { ...user.toJSON() };
    }
};

const userService = {
    add,
    login,
    getUser,
};

export default userService;
