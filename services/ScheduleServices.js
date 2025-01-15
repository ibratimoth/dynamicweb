const ScheduleRepository = require('../repositories/ScheduleRepository');

class ScheduleService {
    constructor() {
        this.scheduleRepository = new ScheduleRepository();
    }

    async createSchedule(scheduleData) {
        const { day, time, title, name, description, location, imageUrl } = scheduleData;

        return await this.scheduleRepository.create({ day, time, title, name, description, location, imageUrl });
    }

    async getAllSchedule() {
        // Call the repository's findAll method to retrieve all team members
        return await this.scheduleRepository.findAll();
    }

    async getScheduleById(id) {
        return await this.scheduleRepository.findById(id);
    }

    async updateSchedule(id, updatedData) {
        return await this.scheduleRepository.update(id, updatedData);
    }

    async deleteSchedule(id) {
        return await this.scheduleRepository.delete(id);
    }

    async deleteAllSchedule() {
        return await this.scheduleRepository.deleteAll();
    }
    
}

module.exports = ScheduleService;
