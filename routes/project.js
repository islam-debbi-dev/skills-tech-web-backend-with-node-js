const express = require('express');
const { body } = require('express-validator');
const Project = require('../models/Project');
const User = require('../models/user-model');
const Group = require('../models/group');
const { model } = require('mongoose');
const router = express.Router();


// create project
router.post('/',
    [
        body('title').notEmpty(),
        body('description').notEmpty(),
        body('teacherId').notEmpty()
    ],
    async (req, res) => {
        try {
            const { title, description, teacherId } = req.body;
            const project = await Project.create({
                title,
                description,
                teacher: teacherId
            });
            res.json(project);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
);

// update project

router.put('/:id',
    [
        body('title').optional().notEmpty(),
        body('description').optional().notEmpty(),
    ],
    async (req, res) => {
        try {
            const { title, description } = req.body;            
            const project = await Project.findByIdAndUpdate(
                req.params.id,
                {
                    title,
                    description,
                },
            )
            res.json(project);
        } catch (error) {
            res.status("500").json({ message: "Server error", error: error.message });
        }
    }
);
// get all project 
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        // fetch teacher firsname
        const projectsWithTeacher = await Promise.all(projects.map(async (project) => {
            const teacher = await User.findById(project.teacher).select('fullName _id');
            return {
            ...project._doc,
            teacher: teacher ?  teacher._id  : { id: null, name: 'Unknown' },
            teacherFullName: teacher ? teacher.fullName : 'Unknown'
        };
        }));
        if (!projectsWithTeacher || projectsWithTeacher.length === 0) {
            return res.status(404).json({ message: 'No projects found' });
        }
        res.json(projectsWithTeacher);
        
        // if (!projects || projects.length === 0) {
        //     return res.status(404).json({ message: 'No projects found' });
        // }
        // res.json(projects); 
    }catch(e){
        res.status(500).json({ message: 'Server error', error: e.message });
    }
}
);
// delete project by id 
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        res.json({message: 'Project deleted successfully',project : project});
    }catch(e){
        res.status(500).json({ message: 'Server error', error: e.message });
    }
});

// delete all project

router.delete('/',async(req,res)=>{
    try{
        await Project.deleteMany({});
    res.json('success deleted');
    }
    catch(e){
        res.status(500).json(e)
    }
})

module.exports = router;