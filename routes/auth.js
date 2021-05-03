const express = require('express')
const router = express.Router()
const requireLogin = require('../middleware/requireLogin')


const userController = require('../controllers/user')


router.get('/',requireLogin,userController.viewhin)
router.post('/signup',userController.signup)
router.post('/admin',userController.signup_admin)
router.post('/signin',userController.signin)
router.get('/showAllApproval',requireLogin,userController.showAllApproval)
router.get('/showAllApproved',requireLogin,userController.showAllApproved)

router.post('/approvedUser',userController.approvedUser) 






module.exports = router