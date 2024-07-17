const mongoose = require("mongoose");

const connectDB = async() =>{
    const DB_NAME = 'quantumit'
    const DB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vqggl7c.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    // mongodb+srv://iamunbelievableasrmongodb:gZGFVhaSrwbNNOwV@cluster0.vqggl7c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    try{
        const connectionInstance = await mongoose.connect(DB_URI)
        console.log(`\nMONGO DB CONNECTED !!`);

    }catch(err){
        console.log(`MONGODB CONNECTION ERROR: ${err}`);
        process.exit(1);
    }
}

module.exports = connectDB;