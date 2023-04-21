const express = require("express")
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const mongodb = require('./database/mongodb');
const PORT = process.env.PORT || 9481
const app = express()
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());

app.use('/agency/v1', require('./routes/Routes'));

mongodb.MongooseConnect().then((response)=>{
    console.log(response);
    if(response.status===200){
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    }else{
        console.log("Error while connecting to MongoDB")
    }
})