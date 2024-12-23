const TeamMemberRepo = require('../repositories/TeamMemberRepo');

class TeamMemberService {
    constructor() {
        this.teamMemberRepo = new TeamMemberRepo();
    }

    async createTeamMember(teamMemberData) {
        const { name, title, imageUrl } = teamMemberData;

        // Validation
        if (!name || !title || !imageUrl) {
            throw new Error('All fields (name, title, imageUrl) are required.');
        }

        return await this.teamMemberRepo.create({ name, title, imageUrl });
    }

    async getAllTeamMembers() {
        // Call the repository's findAll method to retrieve all team members
        return await this.teamMemberRepo.findAll();
    }

    async getTeamMemberById(id) {
        return await this.teamMemberRepo.findById(id);
    }

    async updateTeamMember(id, updatedData) {
        return await this.teamMemberRepo.update(id, updatedData);
    }

    async deleteTeamMember(id) {
        return await this.teamMemberRepo.delete(id);
    }

    async deleteAllTeamMembers() {
        return await this.teamMemberRepo.deleteAll();
    }
    
}

module.exports = TeamMemberService;
