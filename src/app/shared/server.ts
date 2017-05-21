

import * as express from 'express';
import {Application} from 'express';
import {apiGetUserThreads} from "./api/apiGetUserThreads";
const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());


apiGetUserThreads(app);


app.listen(8070, () => {
    console.log('Server is now running on port 8070 ...');
});