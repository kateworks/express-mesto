const router = require('express').Router();
const { checkProfile, checkAvatar } = require('../utils/validation');

const {
  getUsers,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users.js');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);

router.patch('/users/me', checkProfile, updateProfile);
router.patch('/users/me/avatar', checkAvatar, updateAvatar);

module.exports = router;
