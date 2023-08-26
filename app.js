const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Api Routes
const fileListRoute = require('./routes/fileListRoute');
const folderListRoute = require('./routes/folderListRoute');
const moveRoute = require('./routes/moveRoute');
const deleteRoute = require('./routes/deleteRoute');

//İmplement Routes
app.use(fileListRoute);
app.use(folderListRoute);
app.use(moveRoute);
app.use(deleteRoute);

app.listen(port, () => {
    console.log(`Application standing on port ${port} .`);
});
