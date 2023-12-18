const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardschema=new Schema({
    userid:{type: Schema.Types.ObjectId, ref: "accounts" },
    title:{type: String, required: true},
    desc:{type: String, required: true},
    file:{type: String},
    categ:{type:String,required:true},
});
const cardModel=mongoose.model("cards",cardschema);

module.exports=cardModel;