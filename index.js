const express=require("express")
const path=require("path")
const cookieParser = require('cookie-parser')
const userRouter=require("./routes/user")
const blogRouter=require("./routes/blog")
const {Mongoose}=require("./connect")
const { checkForAuthCookie } = require("./controller/authentication")
const Blog=require("./model/blog")

const app=express()

Mongoose("mongodb://127.0.0.1:27017/blogs").then(()=>{console.log(`mongo connected`)})

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(express.static(path.resolve("./public")))
app.use(checkForAuthCookie("token"))

app.get('/', async(req, res) => {
  const allBlogs= await Blog.find({})
  console.log(allBlogs,`allBlog`)
  res.render("home",{
    user:req.user,
    blogs:allBlogs
  });
});
const PORT = 8000;
app.use("/user",userRouter)
app.use("/user",blogRouter)



app.listen(PORT, ()=>{
  console.log(`the link is http://localhost:8000`)
})