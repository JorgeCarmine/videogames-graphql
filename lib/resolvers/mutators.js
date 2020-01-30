'use strict'

const connectDB = require('../db')
const { ObjectID } = require('mongodb');

module.exports = {
        createGame: async(root, { input }) => {
            const defaults = {
                image: ''
            }
            let newGame = Object.assign(defaults, input);
            let db, game;
            try {
                db = await connectDB();
                game = db.collection('games').insertOne(newGame)
            } catch (error) {
                console.error(error)
            }
            return newGame;
        },
        editGame: async(root, { input, _id }) => {
            let db, game;
            console.log(_id);
            try {
                db = await connectDB();
                game = await db.collection('games').findOneAndUpdate(
                    { _id: ObjectID(_id)},
                    { $set: input }
                )

                if(!game.lastErrorObject.n) throw new Error('Instance not found')
            } catch(error) {
                console.error(error)
            }
            console.log("game", game)
            return game.value;
        },
        createStudio: async(root, { input }) => {
            const defaults = {
                image: ''
            }
            let newStudio = Object.assign(defaults, input);
            let db, studio;
            try {
                db = await connectDB();
                studio = db.collection('studios').insertOne(newStudio)
            } catch (error) {
                console.error(error)
            }
            return newStudio;
        },
        editStudio: async(root, { input, _id }) => {
            let db, studio;
            console.log(_id);
            try {
                db = await connectDB();
                studio = await db.collection('studios').findOneAndUpdate(
                    { _id: ObjectID(_id)},
                    { $set: input }
                )

                if(!studio.lastErrorObject.n) throw new Error('Instance not found')
            } catch(error) {
                console.error(error)
            }
            console.log("studio", studio)
            return studio.value;
        }
}
