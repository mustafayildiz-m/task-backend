const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const deleteFile = require('../api/delete');

router.delete('/dev/delete', authenticateToken, async (req, res) => {
    try {
        const { fileId } = req.body;
        const result = await deleteFile.delete(fileId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;
