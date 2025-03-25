const mongoose = require('mongoose');
const { type } = require('os');

const userLogin = mongoose.Schema({
    userfName:{
        type: String,
        required: true
    },
    userlName:{
        type: String,
        required: true
    },
    emailId:{
        type: String,
        required: true
    }
})