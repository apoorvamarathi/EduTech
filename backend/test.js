const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://user1:soithesauce@ac-r8is1la-shard-00-00.mpszvpf.mongodb.net:27017,ac-r8is1la-shard-00-01.mpszvpf.mongodb.net:27017,ac-r8is1la-shard-00-02.mpszvpf.mongodb.net:27017/?ssl=true&replicaSet=atlas-5orsqm-shard-0&authSource=admin&appName=Edu1")
.then(() => {
  console.log("CONNECTED");
})
.catch((err) => {
  console.log(err);
});