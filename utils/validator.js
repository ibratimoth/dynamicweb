const validator = require("validator");

class ValidatorHelper {
    validateRegisterInput({ name, email, password }) {
        if (!name || !email || !password) {
            return { valid: false, message: "All fields must be filled" };
        }

        if (!validator.isEmail(email)) {
            return { valid: false, message: "Email is not valid" };
        }

        // Extract the local part of the email address
        const localPart = email.split("@")[0];
        if (localPart[0] !== localPart[0].toLowerCase()) {
            return {
                valid: false,
                message: "Email must start with a lowercase letter",
            };
        }

        if (password.length < 7) {
            return {
                valid: false,
                message: "Password must be at least 7 characters long",
            };
        }

        if (!/[A-Z]/.test(password)) {
            return {
                valid: false,
                message: "Password must contain at least one uppercase letter",
            };
        }

        if (!/[a-z]/.test(password)) {
            return {
                valid: false,
                message: "Password must contain at least one lowercase letter",
            };
        }

        if (!/\d/.test(password)) {
            return {
                valid: false,
                message: "Password must contain at least one number",
            };
        }

        if (!/[\W_]/.test(password)) {
            return {
                valid: false,
                message: "Password must contain at least one special character",
            };
        }

        return { valid: true };
    }

    validatePassword({ password }) {
        if (!password) {
            return { valid: false, message: "All fields must be filled" };
        }

        if (password.length < 7) {
            return {
                valid: false,
                message: "Password must be at least 7 characters long",
            };
        }

        if (!/[A-Z]/.test(password)) {
            return {
                valid: false,
                message: "Password must contain at least one uppercase letter",
            };
        }

        if (!/[a-z]/.test(password)) {
            return {
                valid: false,
                message: "Password must contain at least one lowercase letter",
            };
        }

        if (!/\d/.test(password)) {
            return {
                valid: false,
                message: "Password must contain at least one number",
            };
        }

        if (!/[\W_]/.test(password)) {
            return {
                valid: false,
                message: "Password must contain at least one special character",
            };
        }

        return { valid: true };
    }

    validateEmail(email) {
        if (!email) {
            return { valid: false, message: "Email field must be filled" };
        }

        if (!validator.isEmail(email)) {
            return { valid: false, message: "Email is not valid" };
        }

        // Extract the local part of the email address
        const localPart = email.split("@")[0];
        if (localPart.length === 0 || localPart[0] !== localPart[0].toLowerCase()) {
            return {
                valid: false,
                message: "Email must start with a lowercase letter",
            };
        }

        return { valid: true };
    }

    validateNameTitleAndImage({ name, title, imageUrl, imageSize }) {
        // Validate name and title
        if (!name || !title) {
            return { valid: false, message: "Name and title must not be empty" };
        }
    
        // Validate imageUrl
        if (!imageUrl) {
            return { valid: false, message: "Image URL must not be empty" };
        }
    
        const allowedImageExtensions = ['.jpeg', '.jpg', '.png'];
        const extension = imageUrl.substring(imageUrl.lastIndexOf('.')).toLowerCase();
    
        if (!allowedImageExtensions.includes(extension)) {
            return {
                valid: false,
                message: "Image must be a valid format (.jpeg, .jpg, or .png)",
            };
        }
    
        // Validate image size (in bytes, assuming imageSize is provided in bytes)
        const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
        if (imageSize > maxSizeInBytes) {
            return {
                valid: false,
                message: "Image size must not exceed 2MB",
            };
        }
    
        return { valid: true };
    }
    
    validateNameSloganAndImage({ name, slogan, imageUrl, imageSize }) {
        // Validate name and title
        if (!name || !slogan) {
            return { valid: false, message: "Name and slogan must not be empty" };
        }
    
        // Validate imageUrl
        if (!imageUrl) {
            return { valid: false, message: "Image URL must not be empty" };
        }
    
        const allowedImageExtensions = ['.jpeg', '.jpg', '.png'];
        const extension = imageUrl.substring(imageUrl.lastIndexOf('.')).toLowerCase();
    
        if (!allowedImageExtensions.includes(extension)) {
            return {
                valid: false,
                message: "Image must be a valid format (.jpeg, .jpg, or .png)",
            };
        }
    
        // Validate image size (in bytes, assuming imageSize is provided in bytes)
        const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
        if (imageSize > maxSizeInBytes) {
            return {
                valid: false,
                message: "Image size must not exceed 2MB",
            };
        }
    
        return { valid: true };
    }

    validateTitleAboutAndImage({ title, about, imageUrl, imageSize }) {
        // Validate name and title
        if (!title || !about) {
            return { valid: false, message: "title and about must not be empty" };
        }
    
        // Validate imageUrl
        if (!imageUrl) {
            return { valid: false, message: "Image URL must not be empty" };
        }
    
        const allowedImageExtensions = ['.jpeg', '.jpg', '.png'];
        const extension = imageUrl.substring(imageUrl.lastIndexOf('.')).toLowerCase();
    
        if (!allowedImageExtensions.includes(extension)) {
            return {
                valid: false,
                message: "Image must be a valid format (.jpeg, .jpg, or .png)",
            };
        }
    
        // Validate image size (in bytes, assuming imageSize is provided in bytes)
        const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
        if (imageSize > maxSizeInBytes) {
            return {
                valid: false,
                message: "Image size must not exceed 2MB",
            };
        }
    
        return { valid: true };
    }

    validateAbc({ day,  time, title, name, description, location, imageUrl, imageSize }) {
        // Validate name and title
        if (!title || !day || !time|| !name|| !description|| !location) {
            return { valid: false, message: "All fields required" };
        }
    
        // Validate imageUrl
        if (!imageUrl) {
            return { valid: false, message: "Image URL must not be empty" };
        }
    
        const allowedImageExtensions = ['.jpeg', '.jpg', '.png'];
        const extension = imageUrl.substring(imageUrl.lastIndexOf('.')).toLowerCase();
    
        if (!allowedImageExtensions.includes(extension)) {
            return {
                valid: false,
                message: "Image must be a valid format (.jpeg, .jpg, or .png)",
            };
        }
    
        // Validate image size (in bytes, assuming imageSize is provided in bytes)
        const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
        if (imageSize > maxSizeInBytes) {
            return {
                valid: false,
                message: "Image size must not exceed 2MB",
            };
        }
    
        return { valid: true };
    }
}

module.exports = ValidatorHelper;
