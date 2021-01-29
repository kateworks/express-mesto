const router = require('express').Router();
const auth = require('../middlewares/auth');
const { checkProfile, checkAvatar } = require('../utils/validation');

const {
  getUsers,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users.js');

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getCurrentUser);

router.patch('/users/me', auth, checkProfile, updateProfile);
router.patch('/users/me/avatar', auth, checkAvatar, updateAvatar);

module.exports = router;
