const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
//   deleteUser,
//   updateUser,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/students/:thoughtId
router.route('/:thoughtId').get(getSingleThought)//.delete(deleteUser).put(updateUser);

module.exports = router;