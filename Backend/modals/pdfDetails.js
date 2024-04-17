import {mongoose} from "mongoose"

const pdfDetailsSchema=new mongoose.Schema(
    {
        pdf:String,
        title:String
    },
    {
        collection :"pdfDetails"
    }
);


export default mongoose.model('pdfDetails',pdfDetailsSchema);