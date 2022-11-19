const mongoose = require("mongoose");
const url = "mongodb+srv://admin:admin123@cluster0.gjldpka.mongodb.net/users?retryWrites=true&w=majority"
const connectDb = () => {
  try {
    // mongo connection
    const con = mongoose.connect(url, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
    });

    console.log("mongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
