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
        res.status(500).json({ message: 'خطأ في الخادم' });
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
        res.status(500).json({ message: 'خطأ في الخادم' });
    }
});

// Submit proposal
router.post('/',
    body('projectId').notEmpty(),
    body('studentId').notEmpty()
    , async (req, res) => {
        try {
            const { projectId, studentId, message } = req.body;

            const project = await Project.findById(projectId);
            if (!project) {
                return res.status(404).json({ message: 'المشروع غير موجود' });
            }
            const student = await User.findById(req.body.studentId);
            if (student.proposalsSubmitted >= 3) {
                return res.status(400).json({ message: 'تم الوصول إلى الحد الأقصى لعدد المقترحات' });
            }

            const existSubmited = await Proposal.findOne({
                projectId: req.body.projectId,
                studentId: req.body.studentId
            });
            if (existSubmited) {
                return res.status(400).json({ message: 'تم تقديم المقترح مسبقًا' });
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

            res.status(201).json({ message: 'تم تقديم الطلب بنجاح' });
        } catch (error) {
            res.status(500).json({ message: 'خطأ في الخادم' });
        }
    });

// Update proposal status
router.put('/:id', body('status').notEmpty().isIn(['pending', 'accepted', 'rejected'])
    , async (req, res) => {
        try {
            const { status } = req.body;
            const proposal = await Proposal.findById(req.params.id);

            if (!proposal) {
                return res.status(404).json({ message: 'المقترح غير موجود' });
            }

            const project = await Project.findById(proposal.projectId);
            if (status === 'accepted') {

                if (project.assignedStudents.length >= project.maxStudents) {
                    return res.status(400).json({ message: 'المشروع يحتوي بالفعل على الحد الأقصى من الطلاب' });
                }
                const alreadyAccepted = project.assignedStudents.some(student => student.studentId.toString() === proposal.studentId.toString());
                if (alreadyAccepted) {
                    return res.status(400).json({ message: 'تم قبول مقترح هذا الطالب مسبقًا' });
                }

                project.assignedStudents.push({ studentId: proposal.studentId, groupId: proposal.groupId });
                await project.save();
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
            } else if (status === 'rejected') {
                proposal.status = status;
                await proposal.save();
                res.json(proposal);
                
            } else {
                return res.status(400).json({ message: 'حالة غير صالحة' });
            }

        } catch (error) {
            res.status(500).json({ message: 'خطأ في الخادم' });
        }
    });

// Select final project
router.post('/select-final', async (req, res) => {
    try {
        const { projectId, studentId } = req.body;
        const student = await User.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'الطالب غير موجود' });
        }
        if (student.finalProject) {
            return res.status(400).json({ message: 'الطالب لديه مشروع نهائي بالفعل' });
        }

        const proposal = await Proposal.findOne({
            studentId: studentId,
            projectId: projectId,
            status: 'accepted'
        });
        if (!proposal) {
            return res.status(400).json({ message: 'لم يتم العثور على مقترح مقبول لهذا المشروع' });
        }
        student.finalProject = projectId;
        await student.save();
        await Proposal.updateMany(
            {
                studentId: studentId,
                _id: { $ne: proposal._id }
            },
            { status: 'rejected' }
        );

        res.status(200).json({ message: 'تم اختيار المشروع النهائي بنجاح' });
    } catch (error) {
        res.status(500).json({ message: 'خطأ في الخادم' });
    }
});

// Delete all proposals
router.delete('/', async (req, res) => {
    try {
        await Proposal.deleteMany({});
        res.json({ message: 'تم حذف جميع المقترحات' });
    } catch (error) {
        res.status(500).json({ message: 'خطأ في الخادم' });
    }
});

module.exports = router;
