const { Router } = require('express');
//the above expression is the same as writing express before the equal sign
const { verifyToken } = require('../middlewares/verifyToken.js')

const userController = require('../controllers/userController.js')

const router = Router();

router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser)
router.delete('/logout',userController.logoutUser)

router.get('/all', verifyToken, userController.getUsers)
router.get('/auth',verifyToken, userController.verifyAuth);


module.exports = router;