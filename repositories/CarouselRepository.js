const Carousel = require('../models/carouselModel');

class CarouselRepository {
    async create(carouselData) {
        return await Carousel.create(carouselData);
    }

    async findById(id) {
        return await Carousel.findOne({ where: { id } });
    }

    async findAll() {
        return await Carousel.findAll(); // Retrieve all Carousel members
    }
    
    async update(id, updatedData) {
        const CarouselMember = await Carousel.findOne({ where: { id } });

        if (!CarouselMember) {
            throw new Error('Carousel not found.');
        }

        // Update the Carousel member in the database
        await CarouselMember.update(updatedData);
        return CarouselMember;
    }
    
    async delete(id) {
        const CarouselMember = await Carousel.findOne({ where: { id } });

        if (!CarouselMember) {
            throw new Error('Carousel not found.');
        }

        // Delete the Carousel member from the database
        await CarouselMember.destroy();
        return true; // Indicating the Carousel member was successfully deleted
    }

    async deleteAll() {
        try {
            // Delete all Carousel members
            await Carousel.destroy({
                where: {}, // No conditions needed to delete all
            });
    
            return true; // Indicating that all Carousel members were successfully deleted
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to delete all Carousel');
        }
    }
}

module.exports = CarouselRepository;