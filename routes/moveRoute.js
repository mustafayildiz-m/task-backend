const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const move = require('../api/move');

router.post('/dev/move', authenticateToken, async (req, res) => {
    try {
        const { destination, source } = req.body;
        const movedFile = await move.move(destination, source);
        res.status(200).json(movedFile);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;
