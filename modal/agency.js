let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    AgencyId: {
        type: String, require: true, index:true, unique:true, sparse:true
    },
    Name: {
        type: String
    },
    Address1: {
        type: String
    },
    Address2: {
        type: String
    },
    State:{
        type: String
    },
    City:{
        type: String
    },
    PhoneNumber:{
        type: String
    }
},{ timestamps: true });

module.exports = mongoose.model('Agencies', UserSchema);
