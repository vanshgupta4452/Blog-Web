const {Schema,model, default: mongoose}=require("mongoose")

const blogSchema= new Schema({
  title:{
    type:String,
    required:true,
  },
  imageurl:{
    type:String,
    required:false,
  },
  body:{
    type:String,
    required:true,
  },
  CreatedId:{
   type:Schema.Types.ObjectId,
   ref:"user",
  },
})

const Blog=mongoose.model('Blog', blogSchema)

module.exports=Blog