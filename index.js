const express=require('express');
const app=express();
const port=8081;
app.set('view engine', 'ejs'); 
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.render('index');   // looks for views/home.ejs
});
app.use(express.static("public"));

app.listen(port,(err)=>{
    if(err){
        console.log(err.message);
    }
    else{
        console.log("Server Stared");
        console.log("http://localhost:"+port);
    }
})