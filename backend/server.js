const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://bookapp:bookapp@bookapps.vng4w.mongodb.net/bookapps?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});