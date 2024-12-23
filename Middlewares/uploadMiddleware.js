const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Adjust the path as needed
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    cb(null, true); // Allow all files
};

// Create the upload middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload.single('imageUrl'); // Replace 'image' with the name of your form field
