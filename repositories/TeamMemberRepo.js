const Team = require('../models/teamMember');

class TeamMemberRepository {
    async create(teamMemberData) {
        return await Team.create(teamMemberData);
    }

    async findById(id) {
        return await Team.findOne({ where: { id } });
    }

    async findAll() {
        return await Team.findAll(); // Retrieve all team members
    }

    async getTeamMemberById(id) {
        // Validation
        if (!id) {
            throw new Error('ID is required to fetch a team member.');
        }

        const teamMember = await this.teamMemberRepo.findById(id);

        if (!teamMember) {
            throw new Error(`Team member with ID ${id} not found.`);
        }

        return teamMember;
    }
    
    async update(id, updatedData) {
        const teamMember = await Team.findOne({ where: { id } });

        if (!teamMember) {
            throw new Error('Team member not found.');
        }

        // Update the team member in the database
        await teamMember.update(updatedData);
        return teamMember;
    }
    async delete(id) {
        const teamMember = await Team.findOne({ where: { id } });

        if (!teamMember) {
            throw new Error('Team member not found.');
        }

        // Delete the team member from the database
        await teamMember.destroy();
        return true; // Indicating the team member was successfully deleted
    }

    async deleteAll() {
        try {
            // Delete all team members
            await Team.destroy({
                where: {}, // No conditions needed to delete all
            });
    
            return true; // Indicating that all team members were successfully deleted
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to delete all team members');
        }
    }
}

module.exports = TeamMemberRepository;