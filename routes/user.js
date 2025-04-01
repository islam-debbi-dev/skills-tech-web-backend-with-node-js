
const checkRole = require('../middleware/checkRole');
const User = require('../models/user-model');
const router = require('./auth')

router.get('/admin',
    checkRole('admin'),
    async (req, res) => {
        try {
            const users = await User.find({ role: { $in: ['teacher', 'student'] } });
            res.status(200).json(users.length ? users : { message: 'No users found.' });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users.', error });
        }
    }
);

router.get('/teacher',
    checkRole('teacher'),
    async (req, res) => {
        try {
            const students = await User.find({ role: 'student' }).select('-password');
            res.status(200).json(students.length ? students : { message: 'No students found.' });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching students.', error });
        }
    }
);

module.exports = router, User;