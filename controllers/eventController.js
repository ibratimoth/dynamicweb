const EventService = require('../services/EventServices');
const ResponseHandler = require('../utils/ResponseHandler');
const ValidatorHelper = require('../utils/validator');
const ImageProcessor = require('../utils/imageProcessor'); // Import the ImageProcessor utility
const path = require('path');
class EventController {
    constructor() {
        this.eventService = new EventService();
        this.responseHandler = new ResponseHandler();
        this.validatorHelper = new ValidatorHelper();
        this.imageProcessor = new ImageProcessor(); // Initialize ImageProcessor
    }

    async createEvent(req, res) {
        try {
            const { title, about } = req.body;
            let imageUrl = req.file ? req.file.filename : null;
            const imageSize = req.file ? req.file.size : 0;

            // Validate input
            const validation = this.validatorHelper.validateTitleAboutAndImage({ title, about, imageUrl, imageSize });
            if (!validation.valid) {
                return this.responseHandler.sendResponse(
                    res,
                    400,
                    false,
                    validation.message
                );
            }

            const newevent = await this.eventService.createEvent({
                title,
                about,
                imageUrl
            });

            return this.responseHandler.sendResponse(
                res,
                201,
                true,
                'event created successfully.',
                newevent
            );
        } catch (error) {
            console.error('Error during event creation:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async getAllEvents(req, res) {
        try {
            const events = await this.eventService.getAllEvent();

            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'events retrieved successfully.',
                events
            );
        } catch (error) {
            console.error('Error during events retrieval:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async getEventById(req, res) {
        try {
            const { id } = req.params;

            const event = await this.eventService.getEventById(id);

            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'event retrieved successfully.',
                event
            );
        } catch (error) {
            console.error('Error during event retrieval:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async updateEvent(req, res) {
        try {
            const { id } = req.params;
            const updatedData = { ...req.body };

            if (req.file) {
                updatedData.imageUrl = req.file ? req.file.filename : null;
            }

            const validation = this.validatorHelper.validateTitleAboutAndImage(updatedData);
            if (!validation.valid) {
                return this.responseHandler.sendResponse(
                    res,
                    400,
                    false,
                    validation.message
                );
            }

            const updatedevent = await this.eventService.updateEvent(id, updatedData);

            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'event updated successfully.',
                updatedevent
            );
        } catch (error) {
            console.error('Error during event update:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async deleteEvent(req, res) {
        try {
            const { id } = req.params;

            await this.eventService.deleteEvent(id);

            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'event deleted successfully.'
            );
        } catch (error) {
            console.error('Error during event deletion:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async deleteAllEvents(req, res) {
        try {
            await this.eventService.deleteAllEvent();
    
            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'All event deleted successfully.'
            );
        } catch (error) {
            console.error('Error during deleting all event:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }
    
}

module.exports = EventController;
