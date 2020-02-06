'use strict'

const db = require('../db')
const { ObjectID } = require('mongodb');
const moment = require('moment');

module.exports = {
        createGame: async(root, { input }) => {
            const defaults = {
                image: null,
            }
            let game = Object.assign(defaults, input);
            try {
                game = await db.createOne('games', game)
            } catch (error) {
                console.error(error)
            }
            return game;
        },
        editGame: async(root, { input, _id }) => {
            let game;
            console.log(_id);
            try {
                game = await db.updateOne('games', _id, input)
            } catch(error) {
                console.error(error)
            }
            console.log("game", game)
            return game;
        },
        deleteGame: async(roor, { _id }) => {
            let deleted; 
            try {
                deleted = await db.deleteOne('games', _id)
            } catch (error) {
                console.log(error);
            }
            return deleted;
        },
        createStudio: async(root, { input }) => {
            const defaults = {
                image: null,
            }
            let studio = Object.assign(defaults, input);
            try {
                studio = await db.createOne('studios', studio)
            } catch (error) {
                console.error(error)
            }
            return studio;
        },
        editStudio: async(root, { input, _id }) => {
            let studio;
            console.log(_id);
            try {
                studio = await db.updateOne('studios', _id, input)
            } catch(error) {
                console.error(error)
            }
            console.log("studio", studio)
            return studio;
        },
        deleteStudio: async(roor, { _id }) => {
            let deleted; 
            try {
                deleted = await db.deleteOne('studios', _id)
            } catch (error) {
                console.log(error);
            }
            return deleted;
        },
        addStudioGame: async(root, { gameID, studioID }) => {
            try {
                let game = db.findInstance('games', { _id: ObjectID(gameID) });
                let studio = db.findInstance('studios', { _id: ObjectID(studioID) });

                if(!game && !studio) throw new Error('El juego o estudio no ha sido encontrado');
            
                game = await db.updateOne('games', gameID, { studioID: studioID });

                return game;
            } catch (error) {
                console.log(error)
            }
        }
}
