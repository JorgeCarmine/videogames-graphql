'use strict'

const db = require('../db')
const { ObjectID } = require('mongodb');

module.exports = {
        getGames: async (root, { input }) => {
            let games;
            try {
                console.log("input", input)
                games = await db.findCollection('games', input);
            } catch (error) {
                console.error(error)
            }
            return games
        },
        getGame:  async(root, { id }) => {
            let game;
            try {
                game = await db.findInstance('games', { _id: ObjectID(id) });
            } catch (error) {
                console.error(error)
            }
            return game
        },
        getStudios: async () => {
            let studios;
            try {
                studios = await db.findCollection('studios');
            } catch (error) {
                console.error(error)
            }
            return studios
        },
        getStudio:  async(root, { id }) => {
            let studio;
            try {
                studio = db.collection('studios').findOne({ _id: ObjectID(id) })
            } catch (error) {
                console.error(error)
            }
            return studio
        }
}