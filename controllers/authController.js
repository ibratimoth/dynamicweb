const AuthService = require('../services/AuthServices');
const ResponseHandler = require('../utils/ResponseHandler');
const ValidatorHelper = require('../utils/validator');

class AuthController {
    constructor() {
        this.authService = new AuthService();
        this.validatorHelper = new ValidatorHelper();
        this.responseHandler = new ResponseHandler();
    }

    async register(req, res) {
        try {
            const { name, email, password, role } = req.body;

            // Validate input
            const validation = this.validatorHelper.validateRegisterInput({ name, email, password });
            if (!validation.valid) {
                return this.responseHandler.sendResponse(
                    res,
                    400,
                    false,
                    validation.message
                );
            }

            const user = await this.authService.registerUser({ name, email, password, role });

            // Send success response
            return this.responseHandler.sendResponse(
                res,
                201,
                true,
                'User registered successfully',
                {
                    ...user.get(), // Use get() method to retrieve the user instance data
                    password: undefined, // Exclude password from the response
                    role: undefined,
                }
            );

        } catch (error) {
            // Handle unexpected errors
            console.error('Error during registration:', error);

            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
    
            // Validate email
            const emailValidation = this.validatorHelper.validateEmail(email);
            if (!emailValidation.valid) {
                return this.responseHandler.sendResponse(
                    res,
                    400,
                    false,
                    emailValidation.message
                );
            }
    
            // Authenticate user
            const { success, user, token, message } = await this.authService.loginUser(email, password);
    
            if (!success) {
                return this.responseHandler.sendResponse(
                    res,
                    400,
                    false,
                    message
                );
            }
    
            // Store user ID in session
            req.session.userId = user.id;

            // Send success response
            return this.responseHandler.sendResponse(
                res,
                200, // HTTP status for success
                true,
                'User logged in successfully',
                { user, token }
            );
        } catch (error) {
            console.error('Error during login:', error);
    
            // Handle unexpected errors
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }
    
    
}

module.exports = AuthController;
