const {Router}=require("express")
const multer  = require('multer')
const path =require("path")

const Blog=require("../model/blog")
const router=Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads'))
  },
  filename: function (req, file, cb) {
    const filename=`${Date.now()}-${file.originalname}`
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

router.get("/addblog",(req,res)=>{
   res.render("addblog",{
    user:req.user
   })
})
router.post("/addblog",upload.single("imageurl"), async (req,res)=>{
  console.log(req.body)
  console.log(req.file)
  const {title,body}=req.body
  const blog=await Blog.create({
      body,
      title,
      createdby:req.user._id,
      imageurl:`/uploads/${req.file.filename}`
  });
  res.redirect("/",)
})

router.get("/:id",async(req,res)=>{
  const blog=await Blog.findById(req.params.id)
  return res.render("blog",{
    user:req.user,
    blog
   })
})


module.exports=router