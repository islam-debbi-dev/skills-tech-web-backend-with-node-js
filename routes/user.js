const checkRole = require('../middleware/checkRole');
const User = require('../models/user-model');
const router = require('./auth')

router.get('/admin',
  
    async (req, res) => {
        try {
            const role =  req.headers.role;
            if(role !== 'admin'){
                return res.status(403).json({ message: 'Access denied' });
            }
            const users = await User.find({ role: { $in: ['teacher', 'student'] } }).select('-password');
            res.status(200).json(users.length ? users : { message: 'No users found.' });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users.', error });
        }
    }
);

router.get('/teacher',
    async (req, res) => {
        try {
            const role =  req.headers.role;
            if(role !== 'teacher'){
                return res.status(403).json({ message: 'Access denied' });
            }
            const students = await User.find({ role: 'student' }).select('-password');
            res.status(200).json(students.length ? students : { message: 'No students found.' });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching students.', error });
        }
    }
);

router.get('/current-user',
    async (req, res)=>{
        
    }
);

module.exports = router;