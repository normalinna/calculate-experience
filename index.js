const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
// const cors = require('cors');

const app = express();
// app.use(
//     cors({
//         credentials: true,
//         origin: ["http://localhost:3000"],
//         optionsSuccessStatus: 200
//     })
// );

app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/send', require('./routes/people.routes'));

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect( config.get("mongoUrl"), {
            useNewUrlParser: true,
            useUnifiedTopology: true, useCreateIndex: true
        });
        app.listen(PORT, () => {`App has been started on port ${PORT}`});
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();

