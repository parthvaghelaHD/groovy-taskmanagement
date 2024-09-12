import userServices from '../services/user.service.js';
import apiResponse from '../helpers/apiResponse.helper.js';
import AppError from '../helpers/AppError.js';

const register = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, gender, phone, dob } = req.body;

        let userData = await userServices.add({
            first_name,
            last_name,
            email,
            password,
            gender,
            phone,
            dob,
        });
        delete userData.password;

        apiResponse(res, {
            code: 201,
            status: 200,
            message: 'account created.',
            data: userData,
        });
    } catch (error) {
        if (error.code === 11000) {
            next(new AppError('Email address already register with us', 400));
        } else next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await userServices.getUser({ email });
        if (!user) {
            next(new AppError('email id doesn\'t exist.', 404));
        }

        if (email && password && !req.query.token) {
            userServices
                .login({ email, password })
                .then((user) => {
                    if (user.msg === 'inCorrect') {
                        return apiResponse(res, {
                            code: 401,
                            status: 401,
                            message: 'Username or Password is incorrect',
                        });
                    } else if (user.msg === 'notFound') {
                        return apiResponse(res, {
                            code: 404,
                            status: 404,
                            message: 'User details not found. Please check your details or Sign Up.',
                        });
                    } else {
                        return res.cookie('token', user.token, {}).status(200).json({
                            code: 200,
                            status: 200,
                            data: user,
                            message: 'login successfully.',
                        });
                    }
                })
                .catch(() => next(new AppError('error while login', 400)));
        }
    } catch (e) {
        next(e);
    }
};

export { register, login };
