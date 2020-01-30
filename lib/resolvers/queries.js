'use strict'

const connectDB = require('../db')
const { ObjectID } = require('mongodb');

module.exports = {
        getGames: async () => {
            let db, games;
            try {
                db = await connectDB();
                games = db.collection('games').find().toArray()
            } catch (error) {
                console.error(error)
            }
            return games
        },
        getGame:  async(root, { id }) => {
            let db, game;
            try {
                db = await connectDB();
                game = db.collection('games').findOne({ _id: ObjectID(id) })
            } catch (error) {
                console.error(error)
            }
            return game
        },
        getStudios: async () => {
            let db, studios;
            try {
                db = await connectDB();
                studios = db.collection('studios').find().toArray()
            } catch (error) {
                console.error(error)
            }
            return studios
        },
        getStudio:  async(root, { id }) => {
            let db, studio;
            try {
                db = await connectDB();
                studio = db.collection('studios').findOne({ _id: ObjectID(id) })
            } catch (error) {
                console.error(error)
            }
            return studio
        }
}