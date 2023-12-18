const cardModel = require("../models/card");

const cardscrt = async (req, res) => {
  try {
    const new_card = await cardModel.create({
      userid: req.body.userid,
      title: req.body.title,
      desc: req.body.desc,
      file: req.body.file,
      categ: "todo",
    });
    res.status(201).json(new_card);
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

const getcards = async (req, res) => {
  try {
    const cards = await cardModel.find({userid:req.params.id});
    res.status(200).json({ cards });
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

const updatecard = async (req, res) => {
  try {
    const card = await cardModel.findByIdAndUpdate(req.body.id, req.body.card);
    res.status(200).json({ card });
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

const deletecard=async(req,res)=>{
  try{
      const data = await cardModel.findByIdAndDelete(req.params.id);
      res.status(200);
      res.json({ 
        status: "success",
        message: "Deleted",
      });
  
  }catch(e){
    console.log(e);
    res.status(400).json({message:e});
  }
}

module.exports = { cardscrt, getcards, updatecard,deletecard };
