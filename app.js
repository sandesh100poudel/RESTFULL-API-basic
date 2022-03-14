const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const ejs = require("ejs");
const app=express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB",{useNewUrlParser:true},()=>{
    console.log("connected to mongodb");
});

const articleSchema={
    title:String,
    content:String
};

const Article = mongoose.model("Article", articleSchema);

//////////////////////////Requests targeting a all the  articles///////////////////////////////


app.route("/articles").get(function(req,res){
    //<MODELname>.find({condition},function(err,result){ //use the found result docs})
    Article.find((err, foundArticles)=>{
        if(!err){
        res.send(foundArticles);

        }else{
            res.send(err);
        }
        


    })
})

.post((req, res)=>{
    const newArticle=new Article({
        title:req.body.title,
        content:req.body.content
    });
    newArticle.save((err)=>{
        if(!err){
            res.send("successfully added a new article");
    
        }else{
            res.send(err);
        }
    });
    })

    .delete((req,res)=>{
        Article.deleteMany((err)=>{
            if (!err){
                res.send("succesfully deleted all the articles")
            }else{
                res.send(err);
            }
        })
    
    })



app.get("/articles",function(req,res){
    //<MODELname>.find({condition},function(err,result){ //use the found result docs})
    Article.find((err, foundArticles)=>{
        if(!err){
        res.send(foundArticles);

        }else{
            res.send(err);
        }
        


    })
})

app.get("/bishals",(req,res)=>{
    Article.find((err,foundArticles)=>{
        if(!err){
            res.send(foundArticles);
        }else{
            res.send(err);
        }
    })
})


app.post("/bishal",(req, res)=>{

    //create
//  const <constantName>= new <ModelName>({
//     <fieldName>:<fieldData>,

// });
// <constantName>.save();

const newArticle=new Article({
    title:req.body.title,
    content:req.body.content
});
newArticle.save((err)=>{
    if(!err){
        res.send("successfully added a new article");

    }else{
        res.send(err);
    }
});
});


app.delete("/articles",(req,res)=>{
    // <ModelName>.deleteMany(
    //     {conditons},
    //     function(err){

    //     })

    Article.deleteMany((err)=>{
        if (!err){
            res.send("succesfully deleted all the articles")
        }else{
            res.send(err);
        }
    })

})





//second day of api
//////////////////////////Requests targeting a specific articles///////////////////////////////

app.route("/articles/:articleTitle")

.get((req,res)=>{
     //<MODELname>.find({condition},function(err,result){ //use the found result docs})
     Article.find({title: req.params.articleTitle},(err,foundArticle)=>{
         if (foundArticle){
             res.send(foundArticle)}
             else{
                 res.send("No articles matching that title")
             }
     });
})

.put((req,res)=>{
    Article.update(
        {title:req.params.articleTitle},
        {title:req.body.title, content:req.body.content},
        {overwrite:true},
        (err)=>{
            if(!err){
                res.send("success fully updated");
            }else{
                res.send(err);
            }
        }
    );
})



.patch((req,res)=>{
Article.update(
    {title:req.params.articleTitle},
    {$set:req.body},
    (err)=>{
        if (!err){
            res.send("successfully update");
        }else{
            res.send(err);
        }
    }
)


})

.delete((req,res)=>{
    Article.deleteOne(
        {title:req.params.articleTitle},
      
        (err)=>{
            if(!err){
                res.send("success fully updated");
            }else{
                res.send(err);
            }
        }
    )
})






app.listen(3000,()=>{
    console.log("server is running")
})