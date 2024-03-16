const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => console.error("Error in Connecting to Database:", err));
db.once('open', () => console.log("Connected to Database"));

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    gender: String,
    birth_date: Date,
    instrument: String,
    days: [String],
    date: Date,
    time: String,
    comments: String
});

const User = mongoose.model('User', userSchema);

app.post("/internship", (req, res) => {
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        birth_date: req.body.birth_date,
        instrument: req.body.instrument,
        days: req.body.days,
        date: req.body.date,
        time: req.body.time,
        comments: req.body.comments
    });
console.log("User Info :", newUser)
            newUser.save()
            .then(result => {
                console.log("User Inserted Successfully");
                res.redirect('signup_successful.html');
            })
            .catch(err => {
                console.error("Error inserting user:", err);
                return res.status(500).send("Error inserting user");
            });
        });   
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    res.redirect('index.html');
});

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});