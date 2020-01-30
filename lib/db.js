const { MongoClient } = require('mongodb');
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME
} = process.env

let connection
const mongoUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`;

async function connectDB() {
    if(connection) return connection;
    
    try {
        connection = await MongoClient.connect(mongoUrl, {
            useUnifiedTopology: true
        })
    } catch (error) {
        console.error('Could not connect to db', mongoUrl, error);
        process.exit(1);
    }

    // console.log("connection", connection)
    connection = connection.db(DB_NAME);
    return connection;
}


module.exports = connectDB;