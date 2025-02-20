const mongoose = require("mongoose");

async function Mongoose(url) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🔥 MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);  // Exit the app if the connection fails
  }
}

module.exports = {
  Mongoose,
};
