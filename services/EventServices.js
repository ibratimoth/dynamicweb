const EventRepository = require('../repositories/EventRepository');

class EventService {
    constructor() {
        this.eventRepository = new EventRepository();
    }

    async createEvent(eventData) {
        const { title, about, imageUrl } = eventData;

        // Validation
        if (!title || !about || !imageUrl) {
            throw new Error('All fields (title, about, imageUrl) are required.');
        }

        return await this.eventRepository.create({ title, about, imageUrl });
    }

    async getAllEvent() {
        // Call the repository's findAll method to retrieve all team members
        return await this.eventRepository.findAll();
    }

    async getEventById(id) {
        return await this.eventRepository.findById(id);
    }

    async updateEvent(id, updatedData) {
        return await this.eventRepository.update(id, updatedData);
    }

    async deleteEvent(id) {
        return await this.eventRepository.delete(id);
    }

    async deleteAllEvent() {
        return await this.eventRepository.deleteAll();
    }
    
}

module.exports = EventService;
