const router = require('express').Router();
const { checkUser } = require('../utils/validation');

const {
  getUsers,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users.js');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);

router.patch('/users/me', checkUser, updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
