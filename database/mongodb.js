const mongoose = require('mongoose')

async function MongooseConnect(){
    console.log("waiting to mongodb connection....")
    return await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }).then(() =>{
        return({status:200,mesaage:"Connected MongoDB"})
    }).catch((err) => {
        return({status:400,mesaage:"MongoDB Connection Failed"})
    });
}

module.exports = {
    MongooseConnect
};