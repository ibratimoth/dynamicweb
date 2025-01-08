const Event = require('../models/eventModel');

class EventRepository {
    async create(EventData) {
        return await Event.create(EventData);
    }

    async findById(id) {
        return await Event.findOne({ where: { id } });
    }

    async findAll() {
        return await Event.findAll(); // Retrieve all Event members
    }
    
    async update(id, updatedData) {
        const EventMember = await Event.findOne({ where: { id } });

        if (!EventMember) {
            throw new Error('Event not found.');
        }

        // Update the Event member in the database
        await EventMember.update(updatedData);
        return EventMember;
    }
    
    async delete(id) {
        const EventMember = await Event.findOne({ where: { id } });

        if (!EventMember) {
            throw new Error('Event not found.');
        }

        // Delete the Event member from the database
        await EventMember.destroy();
        return true; // Indicating the Event member was successfully deleted
    }

    async deleteAll() {
        try {
            // Delete all Event members
            await Event.destroy({
                where: {}, // No conditions needed to delete all
            });
    
            return true; // Indicating that all Event members were successfully deleted
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to delete all Event');
        }
    }
}

module.exports = EventRepository;