const path = require('path');
const sharp = require('sharp');

class ImageProcessor {
    async processImage(filePath) {
        try {
            const fileName = path.basename(filePath); 
            const resizedImagePath = `resized-${fileName}`;

            await sharp(filePath)
                .resize(800, 533)
                .toFile(path.join(__dirname, '../public/uploads', resizedImagePath));

            return `uploads/${resizedImagePath}`; // Correct relative path
        } catch (error) {
            console.error('Error processing image:', error);
            throw error;
        }
    }
}

module.exports = ImageProcessor;
