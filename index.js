const express = require('express');
const dotEnv = require('dotenv');
const dbConnection = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes');

dotEnv.config();

const app = express();
dbConnection();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/',(req,res) => {
    res.send('Hello i am backend , now i am running . You can connect me with yours frontend.');
});

app.use('/api',router);

const PORT = process.env.PORT || 4000;

app.listen(PORT,() => {
    console.log('Server running...');
});
