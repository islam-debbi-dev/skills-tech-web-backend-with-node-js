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
            const users = await User.find({ role: { $in: ['teacher', 'student'] } });
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


// get current user 
router.get('/me/:id',async (req,res)=>{
    try{
        
    const me = await User.findById(req.params.id).select('-password');
    if(!me){
        return res.status(404).json({message:'user not found'});
    }

    res.json({
        me
    })
}catch(e){
    res.status(404).json({message:'user not found'});
}
});

// Update a user info
router.put('/update-user',
    async (req, res) => {
        try {
            const { username } = req.query;
            const { fullName } = req.body;

            if (!username) {
                return res.status(400).json({ message: 'Username is required.' });
            }

            if (!fullName) {
                return res.status(400).json({ message: 'Full name is required.' });
            }

            const updatedUser = await User.findOneAndUpdate(
                { username },
                { fullName },
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found.' });
            }

            res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: 'Error updating user.', error });
        }
        // 
    }
);

module.exports = router, User;
