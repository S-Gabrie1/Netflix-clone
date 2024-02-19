import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://sergegabriel24:test123@netflixreplica.3gxk9jr.mongodb.net/');

    console.log('mongoDB is connected');
  } catch (e) {
    console.log(e);
  }
};


export default connectToDB