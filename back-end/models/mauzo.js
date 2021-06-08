//CREATING SCHEMA
const mongoose = require('mongoose');

//SCHEMA YA KUINGIZIA TAARIFA ZA MAUZO
const mauzoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Bidhaa lazima iwe na jina"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Bidhaa lazima iwe na bei yake kwa namba"],
    },
    totalSales: {
        type: Number
    },
    createdAt: {
        type: String,
        trim: true,

        // default: 

    },
    discreptions: String,
    totalPrice: Number,
    numOfCommoditySoldNow: {
        type: Number,
        required: [true, "Hii ni mara ya ngapi kuuza hii bidhaa leo? ingiza idadi kwa namba"]
    },

});

const borrower = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A borrower must have name"]
    },
    product: {
        type: String,
        required: [true, "A product must have name"]
    },
    price: {
        type: Number,
        required: [true, "you must enter price"]
    },
    quantity: {
        type: Number,
        required: [true, "the quantity of product borrowed is needed"]
    },
    createdAt: {
        type: String,
    },
    totalPrice: Number
})

//CREATING MODEL
exports.mauzo = mongoose.model("mauzo", mauzoSchema);
exports.deni = mongoose.model("deni", borrower);