import mongoose from 'mongoose';

const connectDB = (url) => {
  // use for search functionality
  mongoose.set("strictQuery", true);
  
  mongoose.connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
}

export default connectDB