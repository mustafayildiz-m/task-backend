const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const fileList = require('../api/fileList');

router.post('/dev/files', authenticateToken, async (req, res) => {
    const { folderId } = req.body;

    try {
        const list = await fileList.fileList(folderId);
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;
