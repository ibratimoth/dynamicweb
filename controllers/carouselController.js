const CarouselService = require('../services/CarouselServices');
const ResponseHandler = require('../utils/ResponseHandler');
const ValidatorHelper = require('../utils/validator');
const ImageProcessor = require('../utils/imageProcessor'); // Import the ImageProcessor utility
const path = require('path');
class CarouselController {
    constructor() {
        this.carouselService = new CarouselService();
        this.responseHandler = new ResponseHandler();
        this.validatorHelper = new ValidatorHelper();
        this.imageProcessor = new ImageProcessor(); // Initialize ImageProcessor
    }

    async createCarousel(req, res) {
        try {
            const { name, slogan } = req.body;
            let imageUrl = req.file ? req.file.filename : null;
            const imageSize = req.file ? req.file.size : 0;

            // Validate input
            const validation = this.validatorHelper.validateNameSloganAndImage({ name, slogan, imageUrl, imageSize });
            if (!validation.valid) {
                return this.responseHandler.sendResponse(
                    res,
                    400,
                    false,
                    validation.message
                );
            }

            // if (imageUrl) {
            //     const resizedImageName = await this.imageProcessor.processImage(path.join(__dirname, '../public/uploads/', imageUrl));
            //     imageUrl = resizedImageName; // Store only the filename
            // }

            const newCarousel = await this.carouselService.createCarousel({
                name,
                slogan,
                imageUrl
            });

            return this.responseHandler.sendResponse(
                res,
                201,
                true,
                'Carousel created successfully.',
                newCarousel
            );
        } catch (error) {
            console.error('Error during Carousel creation:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async getAllCarousels(req, res) {
        try {
            const carousels = await this.carouselService.getAllCarousel();

            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'Carousels retrieved successfully.',
                carousels
            );
        } catch (error) {
            console.error('Error during carousels retrieval:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async getCarouselById(req, res) {
        try {
            const { id } = req.params;

            const carousel = await this.carouselService.getCarouselById(id);

            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'Carousel retrieved successfully.',
                carousel
            );
        } catch (error) {
            console.error('Error during carousel retrieval:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async updateCarousel(req, res) {
        try {
            const { id } = req.params;
            const updatedData = { ...req.body };

            if (req.file) {
                updatedData.imageUrl = req.file ? req.file.filename : null;
            }

            const validation = this.validatorHelper.validateNameSloganAndImage(updatedData);
            
            if (!validation.valid) {
                return this.responseHandler.sendResponse(
                    res,
                    400,
                    false,
                    validation.message
                );
            }

            const updatedCarousel = await this.carouselService.updateCarousel(id, updatedData);

            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'Carousel updated successfully.',
                updatedCarousel
            );
        } catch (error) {
            console.error('Error during carousel update:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async deleteCarousel(req, res) {
        try {
            const { id } = req.params;

            await this.carouselService.deleteCarousel(id);

            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'Carousel deleted successfully.'
            );
        } catch (error) {
            console.error('Error during carousel deletion:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async deleteAllcarousels(req, res) {
        try {
            await this.carouselService.deleteAllCarousel();
    
            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'All carousel deleted successfully.'
            );
        } catch (error) {
            console.error('Error during deleting all carousel:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }
    
}

module.exports = CarouselController;
