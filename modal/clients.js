let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    ClientId: {
        type: String, require: true, index:true, unique:true,sparse:true
    },
    Name: {
        type: String
    },
    Email: {
        type: String
    },
    PhoneNumber: {
        type: String
    },
    TotalBill: {
        type: Number
    },
    AgencyId: {
        type: String
    }
},{ timestamps: true });

module.exports = mongoose.model('Clients', UserSchema);
