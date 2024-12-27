const TeamMemberService = require('../services/TeamMemberServices');
const ResponseHandler = require('../utils/ResponseHandler');
const ValidatorHelper = require('../utils/validator');
const ImageProcessor = require('../utils/imageProcessor'); // Import the ImageProcessor utility
const path = require('path');
class TeamMemberController {
    constructor() {
        this.teamMemberService = new TeamMemberService();
        this.responseHandler = new ResponseHandler();
        this.validatorHelper = new ValidatorHelper();
        this.imageProcessor = new ImageProcessor(); // Initialize ImageProcessor
    }

    async createTeamMember(req, res) {
        try {
            const { name, title } = req.body;
            let imageUrl = req.file ? req.file.filename : null;
            const imageSize = req.file ? req.file.size : 0;

            // Validate input
            const validation = this.validatorHelper.validateNameTitleAndImage({ name, title, imageUrl, imageSize });
            if (!validation.valid) {
                return this.responseHandler.sendResponse(
                    res,
                    400,
                    false,
                    validation.message
                );
            }

            if (imageUrl) {
                const resizedImageName = await this.imageProcessor.processImage(path.join(__dirname, '../public/uploads/', imageUrl));
                imageUrl = resizedImageName; // Store only the filename
            }

            const newTeamMember = await this.teamMemberService.createTeamMember({
                name,
                title,
                imageUrl
            });

            return this.responseHandler.sendResponse(
                res,
                201,
                true,
                'Team member created successfully.',
                newTeamMember
            );
        } catch (error) {
            console.error('Error during team member creation:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async getAllTeamMembers(req, res) {
        try {
            const teamMembers = await this.teamMemberService.getAllTeamMembers();

            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'Team members retrieved successfully.',
                teamMembers
            );
        } catch (error) {
            console.error('Error during team members retrieval:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async getTeamMemberById(req, res) {
        try {
            const { id } = req.params;

            const teamMember = await this.teamMemberService.getTeamMemberById(id);

            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'Team member retrieved successfully.',
                teamMember
            );
        } catch (error) {
            console.error('Error during team member retrieval:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async updateTeamMember(req, res) {
        try {
            const { id } = req.params;
            const updatedData = { ...req.body };

            if (req.file) {
                updatedData.imageUrl = `/uploads/${req.file.filename}`;
            }

            const validation = this.validatorHelper.validateNameTitleAndImage(updatedData);
            if (!validation.valid) {
                return this.responseHandler.sendResponse(
                    res,
                    400,
                    false,
                    validation.message
                );
            }

            const updatedTeamMember = await this.teamMemberService.updateTeamMember(id, updatedData);

            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'Team member updated successfully.',
                updatedTeamMember
            );
        } catch (error) {
            console.error('Error during team member update:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async deleteTeamMember(req, res) {
        try {
            const { id } = req.params;

            await this.teamMemberService.deleteTeamMember(id);

            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'Team member deleted successfully.'
            );
        } catch (error) {
            console.error('Error during team member deletion:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }

    async deleteAllTeamMembers(req, res) {
        try {
            await this.teamMemberService.deleteAllTeamMembers();
    
            return this.responseHandler.sendResponse(
                res,
                200,
                true,
                'All team members deleted successfully.'
            );
        } catch (error) {
            console.error('Error during deleting all team members:', error);
            return this.responseHandler.sendResponse(
                res,
                500,
                false,
                'An unexpected error occurred'
            );
        }
    }
    
}

module.exports = TeamMemberController;
