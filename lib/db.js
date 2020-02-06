const { MongoClient, ObjectID } = require('mongodb');
const moment = require('moment');

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME
} = process.env

let connection
const mongoUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/gameshop`;

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

module.exports = {

    
    findInstance: async function(collection, condition = {}) {
        db = await connectDB();
        condition.deletedAt = null;
        return await db.collection(collection).findOne(condition);
    },
    findCollection: async function(collection, condition = {}) {
        db = await connectDB();
        condition.deletedAt = null;
        console.log("condition", condition);
        return await db.collection(collection).find(condition).toArray();
    },
    createOne: async function(collection, instance, defaults = {}) {
        let result;
        defaults = {
            deletedAt: null
        }
        db = await connectDB();
        instance = Object.assign(defaults, instance);
        result = await db.collection(collection).insertOne(instance)
        return result.ops[0];
    },
    updateOne: async function(collection, _id, input) {
        let result
        try {
            db = await connectDB();
            result = await db.collection(collection).findOneAndUpdate(
                { _id: ObjectID(_id)},
                { $set: input }
            )            
        } catch (error) {
            console.log(error);
        }
        result.value = Object.assign(result.value, input);
        return result.value;
    },
    deleteOne: async function(collection, _id) {
        let result
        try {
            db = await connectDB();
            result = await db.collection(collection).findOneAndUpdate(
                { _id: ObjectID(_id)},
                { $set: { deletedAt: moment().format('YYYY-MM-DD') } }
            )            
        } catch (error) {
            console.log(error);
        }
        console.log("result", result.value);
        return result.value;
    }
};