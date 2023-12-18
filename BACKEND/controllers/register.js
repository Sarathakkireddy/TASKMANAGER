const accountModel = require("../models/account");
const { hashed } = require("../utils/passHash");

const register=async(req,res)=>{
    try{
        const accountWithEmail = await accountModel.find({ email: req.body.email });
        const accountWithContact = await accountModel.find({
          contact: req.body.contact,
        });
        if (accountWithEmail.length || accountWithContact.length) {
          res.status(400).json({
            message: "user already exists",
          });
        } else {
          const hashedPass = hashed(req.body.password);
          const new_account = await accountModel.create({ 
            name:req.body.name,
            email:req.body.email,
            contact:req.body.contact,
            password: hashedPass,
          });
          res.status(201).json(new_account); 
        }
    }
    catch(error){
        res.status(400).json({
            message:error,
        })
    }
}

module.exports=register;