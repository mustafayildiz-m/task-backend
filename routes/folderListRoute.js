const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const folderList = require('../api/folderList');

router.get('/dev/folders', async (req, res) => {
    try {
        const list = await folderList.folderList();
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;
