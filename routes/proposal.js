const express = require('express');
const router = express.Router();
const Proposal = require('../models/Proposal');
const User = require('../models/user-model');
const Project = require('../models/Project');
const { body } = require('express-validator');

// Get all proposals for a teacher's projects
router.get('/teacher', async (req, res) => {
    try {
        const teacherId = req.query.teacherId;
        const projects = await Project.find({ teacher: teacherId });
        const projectIds = projects.map(project => project._id);
        const proposals = await Proposal.find({ projectId: { $in: projectIds } });
        res.json(proposals);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get student's proposals
router.get('/student', async (req, res) => {
    try {
        const studentId = req.query.studentId;
        console.log(studentId);
        const proposals = await Proposal.find({ studentId });
        res.json(proposals);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Submit proposal
router.post('/',
    body('projectId').notEmpty(),
    body('studentId').notEmpty()
    , async (req, res) => {
        try {
            const { projectId, studentId, message} = req.body;

            const project = await Project.findById(projectId);
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            const student = await User.findById(req.body.studentId);
<<<<<<< HEAD
             // check if student has final project 
             if(student.finalProject){
                res.status(400).json({message : 'already have a final project'});
            }
            if (student.proposalsSubmitted >= 3) {
                return res.status(400).json({ message: 'Maximum number of proposals reached' });
            }
           
            // if proposal already submited
            
=======
            // // check if student has a group
            // if(!student.groupId){
            //     return res.status(400).json({ message: 'you are not in group' });
            // }
            if (student.proposalsSubmitted >= 3) {
                return res.status(400).json({ message: 'Maximum number of proposals reached' });
            }

            // if proposal already submitted
>>>>>>> 66fabd43be9f78b6526d120832e841a816c5442e
            const existSubmited = await Proposal.findOne({
                projectId: req.body.projectId,
                studentId: req.body.studentId
            });
            if (existSubmited) {
                return res.status(400).json({ message: 'Proposal already submitted' });
            }

            const proposal = await Proposal.create({
                projectId: projectId,
                studentId: studentId,
                groupId: student.groupId,
                message: message
            });
            console.log(proposal);

            student.proposalsSubmitted += 1;
            await student.save();

            res.status(201).json(proposal);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    });

// Update proposal status
router.put('/:id', body('status').notEmpty().isIn(['pending', 'accepted', 'rejected'])
    , async (req, res) => {
        try {
            const { status } = req.body;
            const proposal = await Proposal.findById(req.params.id);

            if (!proposal) {
                return res.status(404).json({ message: 'Proposal not found' });
            }

            const project = await Project.findById(proposal.projectId);
            if (status === 'accepted') {

                if (project.assignedStudents.length >= project.maxStudents) {
                    return res.status(400).json({ message: 'Project already has maximum number of students' });
                }
                // check if student already accepted and exist in assignedStudents project
                const alreadyAccepted = project.assignedStudents.some(student => student.studentId.toString() === proposal.studentId.toString());
                if (alreadyAccepted) {
                    return res.status(400).json({ message: "this Student's proposel already accepted" });
                }
         

                project.assignedStudents.push({ studentId: proposal.studentId, groupId: proposal.groupId });
                await project.save();
            }

            proposal.status = status;
            await proposal.save();
            await Proposal.updateMany(
                {
                    studentId: proposal.studentId,
                    _id: { $ne: proposal._id }
                },
                { status: 'rejected' }
            );

            res.json(proposal);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    });

// Select final project
router.post('/select-final', async (req, res) => {
    try {
        const { projectId, studentId } = req.body;
        const student = await User.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        // cheak if student already has a final project 
        if (student.finalProject) {
            return res.status(400).json({ message: 'Student already has a final project' });
        }

        const proposal = await Proposal.findOne({
            studentId: studentId,
            projectId: projectId,
            status: 'accepted'
        });
        if (!proposal) {
            return res.status(400).json({ message: 'No accepted proposal found for this project' });
        }
        student.finalProject = projectId;
        await student.save();
<<<<<<< HEAD

        await Proposal.updateMany(
            {
                studentId: studentId,
                _id: { $ne: proposal._id }
            },
            { status: 'rejected' }
        );

        res.json({ message: 'Final project selected successfully' });
=======
        
            await Proposal.updateMany(
                {
                    studentId: studentId,
                    _id: { $ne: proposal._id }
                },
                { status: 'rejected' }
            );
        
        res.status(200).json({ message: 'Final project selected successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
// delete all proposal
router.delete('/', async (req, res) => {
    try {
        await Proposal.deleteMany({});
        res.json({ message: 'All proposals deleted' });
>>>>>>> 66fabd43be9f78b6526d120832e841a816c5442e
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;