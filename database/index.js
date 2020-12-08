const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;
const client = new MongoClient(MONGO_CONNECTION_STRING, { useUnifiedTopology: true });

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log('Databases:');
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function connectToDB() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */


  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('database connected');
    await listDatabases(client);
    // Make the appropriate DB calls
    
  } catch (e) {
    console.error(e);
  
  } finally {
    await client.close();
    console.log('closed');
  }
}
module.exports = {
  connectToDB,
  listDatabases,
  client,
};
// main().catch(console.error);
