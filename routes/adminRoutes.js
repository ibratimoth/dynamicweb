const express = require("express")
const authController = require('../controllers/authController');
const teamController = require('../controllers/teamMemberController');
const upload = require('../Middlewares/uploadMiddleware');
const TeamController = new teamController();
const AuthController = new authController();
const router = express.Router()

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

router.get('/', (req, res) => {
    res.render('auth-signin-cover');
})

router.get('/dash', (req, res) => {
    res.render('admin');
})

router.get('/team', (req, res) => {
    res.render('pages-team');
})

module.exports = router