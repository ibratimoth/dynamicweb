const AuthRepository = require('../repositories/AuthRepository');
const tokenUtil = require('../utils/generateToken');
const HashHelper = require('../helpers/hashHelper');
const ResponseHandler = require('../utils/ResponseHandler');
class AuthService {
    constructor() {
        this.authRepository = new AuthRepository();
        this.tokenUtil = new tokenUtil();
        this.hashHelper = new HashHelper();
        this.responseHandler = new ResponseHandler();
    }

    async registerUser(userData) {
        const { name, email, password, role } = userData;

        // Check if user already exists
        const existingUser = await this.authRepository.findByEmail(email);

        if (existingUser) {
            throw new Error('User already exists')
        }

        const hashedPassword = await this.hashHelper.hashPassword(password);

        return await this.authRepository.register({ name, email, password: hashedPassword, role });

    }

    async loginUser(email, password) {
        const user = await this.authRepository.findByEmail(email);
        
        if (!user) {
            return { success: false, message: 'Invalid email' };
        }
    
        const isPasswordValid = await this.hashHelper.comparePassword(password, user.password);
        
        if (!isPasswordValid) {
            return { success: false, message: 'Invalid password' };
        }
    
        const token = this.tokenUtil.generateToken(user.id, user.role);

        const userResponse = { 
            id: user.id, 
            name: user.name, 
            email: user.email 
        };
        
        return { success: true, user: userResponse , token };
    }    
    
}

module.exports = AuthService;