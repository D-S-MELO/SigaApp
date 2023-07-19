const mongoose = require('mongoose');

const { MongoClient, ServerApiVersion } = require('mongodb');
let uri = process.env.MONGODB_URI;
const user = process.env.USER;
const password = process.env.PASSWORD;
uri = uri.replace('<USER>', user).replace('<PASSWORD>', password);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Você se conectou com sucesso ao MongoDB!');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
