const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejd = require("ejs");

app.use(express.static("public"));

app.set("view engine","ejs");
const mongoose = require("mongoose");

var collect = [];

mongoose.connect("mongodb://localhost:27017/RstDb");

const RestSchema =  mongoose.Schema({
    title: String,
    content : String
});


const Rest =  mongoose.model("Rest",RestSchema);

// const t1 = new Rest({
//     title: "Kartik",
//     content : "He is coder"
// })
//  t1.save();
//  collect.push(t1);
// const t2 = new Rest({
//     title: "Siddhant",
//     content : "He is pro coder"
// })
//  t2.save();
//  collect.push(t2);


app.use(bodyParser.urlencoded({extended: true}));



app.route("/")
.get(function(req, res){
    Rest.find({},function(err,result){
        if(!err){
            res.send(result);
        }else{
        res.send(err);
        }
    })

})
.post(function(req , res){
   
    const NewRest = new Rest({
        title:req.body.title,
        content : req.body.content
    });
    NewRest.save();

    
})
.delete(function(req ,res){
    Rest.deleteMany(function(err){
        if(!err){
            res.send("Sucessfully Deleted");
        }else{
            res.send(err);
        }
    });
});

////// Specified articles

app.route("/:articleTitle")
.get(function(req , res){
    Rest.find({title:req.params.articleTitle},function(err,result){
        if(result){
            res.send(result)
        }else{
            res.send("Not found");
        }
    });
})

.put(function(req,res){
    Rest.updateMany(
        {title:req.params.articleTitle},
        {title:"karna",content:"he is good"},
        {overwrite:true},
        function(err){
            if(!err){
                res.send("Sucessfully Updated article");
            }else{
                res.send(err);
            }
        }
    );
}); 


























app.listen(3000,function(){
    console.log("Server sucess");
})