const express = require("express");
const authController = require('../controllers/authController');
const teamController = require('../controllers/teamMemberController');
const carouselController = require('../controllers/carouselController');
const upload = require('../Middlewares/uploadMiddleware');
const TeamController = new teamController();
const AuthController = new authController();
const CarouselController = new carouselController();
const router = express.Router();

// Registration route
router.post('/register', AuthController.register.bind(AuthController));

// Login route
router.post('/login', AuthController.login.bind(AuthController));

//create route
router.post('/create', upload, TeamController.createTeamMember.bind(TeamController));

// Get all team members route
router.get('/team-members', TeamController.getAllTeamMembers.bind(TeamController));

// Get team member by ID route
router.get('/team-members/:id', TeamController.getTeamMemberById.bind(TeamController));

//update route
router.put('/update/:id', upload, TeamController.updateTeamMember.bind(TeamController));

//delete route
router.delete('/delete/:id', TeamController.deleteTeamMember.bind(TeamController));

// Route to delete all team members
router.delete('/delete-all', TeamController.deleteAllTeamMembers.bind(TeamController));

//create route
router.post('/createc', upload, CarouselController.createCarousel.bind(CarouselController));

// Get all carousels route
router.get('/carousels', CarouselController.getAllCarousels.bind(CarouselController));

// Get carousel by ID route
router.get('/carousel/:id', CarouselController.getCarouselById.bind(CarouselController));

//update route
router.put('/updatec/:id', upload, CarouselController.updateCarousel.bind(CarouselController));

//delete route
router.delete('/delete/:id', CarouselController.deleteCarousel.bind(CarouselController));

// Route to delete all carousel
router.delete('/delete-all', CarouselController.deleteAllcarousels.bind(CarouselController));

router.get('/', (req, res) => {
    res.render('auth-signin-cover');
});

router.get('/dash', (req, res) => {
    res.render('admin');
});

router.get('/team', (req, res) => {
    res.render('pages-team');
});

router.get('/caro', (req, res) => {
    res.render('carousel');
});

module.exports = router;