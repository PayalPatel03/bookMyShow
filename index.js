const express = require('express');
const app = express();
const port = 8081;

app.set('view engine', 'ejs'); 
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index"); 
});


app.get("/movie-details", (req, res) => {
    res.render("movie-details");  
});

app.use(express.static("public"));

app.listen(port, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Server Started");
        console.log("http://localhost:" + port);
    }
});
