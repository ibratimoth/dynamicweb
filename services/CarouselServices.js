const CarouselRepository = require('../repositories/CarouselRepository');

class CarouselService {
    constructor() {
        this.carouselRepository = new CarouselRepository();
    }

    async createCarousel(carouselData) {
        const { name, slogan, imageUrl } = carouselData;

        // Validation
        if (!name || !slogan || !imageUrl) {
            throw new Error('All fields (name, slogan, imageUrl) are required.');
        }

        return await this.carouselRepository.create({ name, slogan, imageUrl });
    }

    async getAllCarousel() {
        // Call the repository's findAll method to retrieve all team members
        return await this.carouselRepository.findAll();
    }

    async getCarouselById(id) {
        return await this.carouselRepository.findById(id);
    }

    async updateCarousel(id, updatedData) {
        return await this.carouselRepository.update(id, updatedData);
    }

    async deleteCarousel(id) {
        return await this.carouselRepository.delete(id);
    }

    async deleteAllCarousel() {
        return await this.carouselRepository.deleteAll();
    }
    
}

module.exports = CarouselService;
