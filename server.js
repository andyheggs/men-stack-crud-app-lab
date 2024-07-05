const dotenv = require("dotenv"); 

const express = require("express");

const mongoose = require("mongoose");

const EquitiesApp = require("./models/equitiesApp.js");


dotenv.config(); 

const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {

    console.log(`Connected to MongoDB ${mongoose.connection.equitiesApp}.`); 
});   


// Route to render the index page
app.get("/", async (req, res) => {

    res.render("index.ejs");

  });

// Find Equities
app.get("/equities", async (req, res) => {

    const allEquities = await EquitiesApp.find();

    console.log(allEquities); 

    res.send("Welcome to the index page!");

});

app.get("/equities", async (req, res) => {

    const allEquities = await EquitiesApp.find();

    res.render("equities/index.ejs", { equities: allEquities });

});
  

 // Route to display the form 
app.get("/equitiesApp/new", (req, res) => {

    res.render("equities/new.ejs");

});


// POST /equities - to handle form submission and save to database

// POST /equities - to handle form submission and save to database
app.post("/equities", async (req, res) => {

    try {
        // Convert inPortfolio to boolean
        if (req.body.inPortfolio === "on") {

            req.body.inPortfolio = true;
        } else {
            req.body.inPortfolio = false;
        }

        const newEquity = new EquitiesApp(req.body);

        await newEquity.save();

        console.log(req.body);

        res.redirect("/equities"); // redirect to index equities

    } catch (error) {

        console.error("Error saving the equity data:", error);

    }
});

// Start the server

app.listen(3000, () => {

  console.log("Listening on port 3000");

});
