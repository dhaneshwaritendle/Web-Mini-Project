require('dotenv').config()
const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose')
const User = require("./models/User");
const userRoute = require("./routes/users");

/* CONFIG */
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use('/assets', express.static('public/assets'))

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    } , 
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + file.originalname);
    },
});

const upload = multer({ storage });

/* ROUTES WITH FILE */

/* ROUTES */
app.get('/', (req, res) => res.sendStatus(200));
app.use('/api/users', userRoute);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    app.listen(PORT, () => console.log(`Server: ${PORT}`));
    // const user = User({
    //     username: "testuser",
    //     email: "test@gmail.com",
    //     password: "helloworld123"
    // })
    // await user.save()
})
.catch((err) => console.log(`Error: ${err}`));