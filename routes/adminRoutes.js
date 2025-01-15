const express = require("express");
const authController = require('../controllers/authController');
const teamController = require('../controllers/teamMemberController');
const carouselController = require('../controllers/carouselController');
const eventController = require('../controllers/eventController');
const scheduleController = require('../controllers/scheduleController')
const upload = require('../Middlewares/uploadMiddleware');
const TeamController = new teamController();
const AuthController = new authController();
const CarouselController = new carouselController();
const EventController = new eventController();
const ScheduleController = new scheduleController();;
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
router.delete('/deletec/:id', CarouselController.deleteCarousel.bind(CarouselController));

// Route to delete all carousel
router.delete('/delete-allc', CarouselController.deleteAllcarousels.bind(CarouselController));

//create route
router.post('/createv', upload, EventController.createEvent.bind(EventController));

// Get all Event route
router.get('/events', EventController.getAllEvents.bind(EventController));

// Get Event by ID route
router.get('/event/:id', EventController.getEventById.bind(EventController));

//update route
router.put('/updatev/:id', upload, EventController.updateEvent.bind(EventController));

//delete route
router.delete('/deletev/:id', EventController.deleteEvent.bind(EventController));

// Route to delete all Event
router.delete('/delete-allv', EventController.deleteAllEvents.bind(EventController));

//create route
router.post('/createc', upload, ScheduleController.createSchedule.bind(ScheduleController));

// Get all Event route
router.get('/schedules', ScheduleController.getAllSchedule.bind(ScheduleController));

// Get Event by ID route
router.get('/schedule/:id', ScheduleController.getScheduleById.bind(ScheduleController));

//update route
router.put('/updatec/:id', upload, ScheduleController.updateSchedule.bind(ScheduleController));

//delete route
router.delete('/deletec/:id', ScheduleController.deleteSchedule.bind(ScheduleController));

// Route to delete all Event
router.delete('/delete-allc', ScheduleController.deleteAllSchedule.bind(ScheduleController));

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

router.get('/event', (req, res) => {
    res.render('event');
});

router.get('/schedule', (req, res) => {
    res.render('schedule');
})

module.exports = router;