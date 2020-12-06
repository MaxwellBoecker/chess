const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const listDatabases = require('mongodb');

dotenv.config();

async function connectToDB() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const { MONGO_CONNECTION_STRING } = process.env;
  console.log(MONGO_CONNECTION_STRING);

  const client = new MongoClient(MONGO_CONNECTION_STRING, { useUnifiedTopology: true });

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('database connected');
    // Make the appropriate DB calls
    // await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
    console.log('closed');
  }
}
module.exports = {
  connectToDB,
};
// main().catch(console.error);
