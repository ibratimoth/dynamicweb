const path = require('path');
const sharp = require('sharp');

class ImageProcessor {
    async processImage(filePath) {
        try {
            const fileName = path.basename(filePath); 
            const resizedImageName = `resized-${fileName}`;

            await sharp(filePath)
                .resize(400, 533)
                .toFile(path.join(__dirname, '../public/uploads', resizedImageName));

            return resizedImageName; // Return only the resized image name
        } catch (error) {
            console.error('Error processing image:', error);
            throw error;
        }
    }
}

module.exports = ImageProcessor;
