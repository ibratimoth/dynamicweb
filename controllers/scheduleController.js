const ScheduleService = require('../services/ScheduleServices');
const ResponseHandler = require('../utils/ResponseHandler');
const ValidatorHelper = require('../utils/validator');
const ImageProcessor = require('../utils/imageProcessor'); // Import the ImageProcessor utility
const path = require('path');
class ScheduleController {
    constructor() {
        this.scheduleService = new ScheduleService();
        this.responseHandler = new ResponseHandler();
        this.validatorHelper = new ValidatorHelper();
        this.imageProcessor = new ImageProcessor(); // Initialize ImageProcessor
    }

    async createSchedule(req, res) {
        try {
            const { day, time, title, name, description, location } = req.body;
            let imageUrl = req.file ? req.file.filename : null;
            const imageSize = req.file ? req.file.size : 0;

            // Validate input
            const validation = this.validatorHelper.validateAbc({ day, time, title, name, description, location, imageUrl, imageSize });
            if (!validation.valid) {
                return this.responseHandler.sendResponse(
                    res,
                    400,
                    false,
                    validation.message
                );
            }

            const newSchedule = await this.scheduleService.createSchedule({
                title,
                about,
                imageUrl
            });

            return this.responseHandler.sendResponse(
                res,
                201,
                true,
                'schedule created successfully.',
                newSchedule
            );
        } catch (error) {
            console.error('Error during schedule creation:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async getAllSchedule(req, res) {
        try {
            const schedules = await this.scheduleService.getAllSchedule();

            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'schedules retrieved successfully.',
                schedules
            );
        } catch (error) {
            console.error('Error during schedules retrieval:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async getScheduleById(req, res) {
        try {
            const { id } = req.params;

            const schedule = await this.scheduleService.getScheduleById(id);

            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'schedule retrieved successfully.',
                schedule
            );
        } catch (error) {
            console.error('Error during schedule retrieval:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async updateSchedule(req, res) {
        try {
            const { id } = req.params;
            const updatedData = { ...req.body };

            if (req.file) {
                updatedData.imageUrl = req.file ? req.file.filename : null;
            }

            const validation = this.validatorHelper.validateAbc(updatedData);
            if (!validation.valid) {
                return this.responseHandler.sendResponse(
                    res,
                    400,
                    false,
                    validation.message
                );
            }

            const updatedSchedule = await this.scheduleService.updateSchedule(id, updatedData);

            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'schedule updated successfully.',
                updatedSchedule
            );
        } catch (error) {
            console.error('Error during schedule update:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async deleteSchedule(req, res) {
        try {
            const { id } = req.params;

            await this.scheduleService.deleteSchedule(id);

            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'schedule deleted successfully.'
            );
        } catch (error) {
            console.error('Error during schedule deletion:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async deleteAllSchedule(req, res) {
        try {
            await this.scheduleService.deleteAllSchedule();
    
            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'All schedule deleted successfully.'
            );
        } catch (error) {
            console.error('Error during deleting all schedule:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }
    
}

module.exports = ScheduleController;
