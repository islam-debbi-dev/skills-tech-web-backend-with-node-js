const express = require('express');
const Group = require('../models/group');
const User = require('../models/user-model');
const router = express.Router();

// create a new group
router.post('/create/:id', async (req, res) => {
    try {
        const { groupName } = req.body;
        const studentId = req.params.id;

        const newGroup = new Group({ studentcreaterId: studentId, groupName: groupName });
        await newGroup.save();

        res.status(201).json({ message: 'Group created successfully', group: newGroup });
    } catch (error) {
        res.status(500).json({ message: 'Error creating group', error });
    }
});

module.exports = router;