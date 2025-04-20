const checkRole = require('../middleware/checkRole');
const User = require('../models/user-model');
const router = require('./auth')

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
    res.json({message:'user found',me});
}catch(e){
    res.status(404).json({message:'user not found'});
}
});

// update user by id 
router.put('/update/:id',async (req,res)=>{
    try{
        const fullName = req.body.fullName;
        if(!fullName){
            return res.status(400).json({message:'full name is required'});
        }
        const user = await User.findByIdAndUpdate(req.params.id,{
            fullName
        },{new:true});
        if(!user){
            return res.status(404).json({message:'user not found'});
        }
        res.json({
            message: 'user updated successfully',
            user
        })
    }catch(e){
        res.status(404).json({message:'user not found'});
    }
});



module.exports = router, User;
