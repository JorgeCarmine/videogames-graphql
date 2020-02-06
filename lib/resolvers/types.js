'use strict'

const db = require('../db')
const { ObjectID } = require('mongodb');
const handleError = require('../errorHandler');

module.exports = {
    Game: {
        studio: async ({ studioID }) => {
            try {
                let studio = await db.findInstance('studios', { _id: ObjectID(studioID) });
                return studio;
            } catch (error) {
                return handleError(error);
            }
        }
    }
}