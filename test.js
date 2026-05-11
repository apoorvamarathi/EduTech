const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://username:password@edu1.mpszvpf.mongodb.net/test"
)
.then(() => {
  console.log("CONNECTED");
})
.catch((err) => {
  console.log(err);
});