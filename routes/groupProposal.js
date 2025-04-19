const express = require('express');
const GroupProposal = require('../models/GroupProposal');
const Group = require('../models/group');
const User = require('../models/user-model');
const router = express.Router();

// Create a new group proposal
router.post('/create', async (req, res) => {
    try {
        const { groupId, studentId, message } = req.body;
        console.log(req.body);
        // Check if the group exists
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }   
        // check if group is not full
        if (group.students.length >= group.maxStudents) {
            return res.status(400).json({ message: 'Group is full' });
        }
        // Check if the student is already in the group
        if (group.students.includes(studentId)) {
            return res.status(400).json({ message: 'Student is already in the group' });
        }

        // Check if the student exists
        const student = await User.findById(studentId);
        if (!student || student.role !== 'student') {
            return res.status(404).json({ message: 'Student not found or invalid role' });
        }


        const proposal = new GroupProposal({ groupId, studentId, message });

        await proposal.save();
        res.status(201).json({ message: 'Proposal sent successfully', proposal });

    } catch (error) {
        res.status(500).json({ message: 'Error creating proposal', error });
    }
});

// Accept or reject a proposal
router.put('/:id/respond', async (req, res) => {
    try {
        const { status } = req.body; // 'accepted' or 'rejected'
        const proposalId = req.params.id;

        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const proposal = await GroupProposal.findByIdAndUpdate(
            proposalId,
            { status },
            { new: true }
        );
        // add student id to this group 
        // if the proposal is accepted , reject another groupproposel for this student id to the group

        if (status === 'accepted') {
        //    await Group.findByIdAndUpdate(proposal.groupId, { $addToSet: { students: proposal.studentId } });
            await GroupProposal.updateMany(
                { groupId: proposal.groupId, studentId: proposal.studentId, _id: { $ne: proposalId } },
                { status: 'rejected' }
            );
            // add student id to this group
            await Group.findByIdAndUpdate(proposal.groupId, { $addToSet: { students: proposal.studentId } });
            // add id group to the student
            await User.findByIdAndUpdate(proposal.studentId, { $set: { groupId: proposal.groupId } });
        }
        await GroupProposal.findByIdAndUpdate(proposalId, { status: status }, { new: true });

        res.status(200).json({ message: `Proposal ${status} successfully`, proposal });
    } catch (error) {
        res.status(500).json({ message: 'Error responding to proposal', error });
    }
});

// Get all proposals for a student
router.get('/student/:id', async (req, res) => {
    try {
        const studentId = req.params.id;

        const proposals = await GroupProposal.find({ studentId }).populate('groupId', 'groupName');

        res.status(200).json(proposals.length ? proposals : { message: 'No proposals found' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching proposals', error });
    }
});

// delete all proposals

router.delete('/deleteAll', async (req, res) => {
    try {
        await GroupProposal.deleteMany({});
        res.status(200).json({ message: 'All proposals deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting proposals', error });
    }
}
);


module.exports = router;