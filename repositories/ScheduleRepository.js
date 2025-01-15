const Schedule = require('../models/scheduleModel');

class ScheduleRepository {
    async create(ScheduleData) {
        return await Schedule.create(ScheduleData);
    }

    async findById(id) {
        return await Schedule.findOne({ where: { id } });
    }

    async findAll() {
        return await Schedule.findAll(); // Retrieve all Schedule members
    }
    
    async update(id, updatedData) {
        const ScheduleMember = await Schedule.findOne({ where: { id } });

        if (!ScheduleMember) {
            throw new Error('Schedule not found.');
        }

        // Update the Schedule member in the database
        await ScheduleMember.update(updatedData);
        return ScheduleMember;
    }
    
    async delete(id) {
        const ScheduleMember = await Schedule.findOne({ where: { id } });

        if (!ScheduleMember) {
            throw new Error('Schedule not found.');
        }

        // Delete the Schedule member from the database
        await ScheduleMember.destroy();
        return true; // Indicating the Schedule member was successfully deleted
    }

    async deleteAll() {
        try {
            // Delete all Schedule members
            await Schedule.destroy({
                where: {}, // No conditions needed to delete all
            });
    
            return true; // Indicating that all Schedule members were successfully deleted
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to delete all Schedule');
        }
    }
}

module.exports = ScheduleRepository;