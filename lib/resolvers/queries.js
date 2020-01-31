'use strict'

const db = require('../db')
const { ObjectID } = require('mongodb');

module.exports = {
        getGames: async () => {
            let games;
            try {
                games = await db.findCollection('games');
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