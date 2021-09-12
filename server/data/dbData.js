/**
 * MongoDB connection and simple data fetching module.
 * @module
 * @author Moustapha Star <myildiz1881@gmail.com>
 * @version 0.1
 * @since 0.1
 */

const {MongoClient} = require('mongodb');
const uri = process.env.DB_CONN;

/**
 * Fetches all coffee document.
 * @returns {Promise<unknown>} A Promise to the document array.
 */
async function getAll() {
    const client = new MongoClient(uri);
    try {
        return await client.connect().then(() => {
            return new Promise(function (resolve, reject) {
                client.db('coffee_db')
                    .collection("coffee")
                    .find()
                    .toArray(function (err, docs) {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(docs);
                    });
            });
        });
    } catch (err) {
        return err;
    } finally {
        if (client) await client.close();
    }
}


/**
 * Fetches coffees with given category.
 * @param category Category name to filter collection.
 * @returns {Promise<unknown>} A Promise to found documents array.
 */
async function getByCategory(category) {
    const client = new MongoClient(uri);
    try {
        return await client.connect().then(() => {
            return new Promise(function (resolve, reject) {
                client.db('coffee_db')
                    .collection("coffee")
                    .find({'category': category})
                    .toArray(function (err, docs) {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(docs);
                    });
            });
        });
    } catch (err) {
        return err;
    } finally {
        if (client) await client.close();
    }
}


/**
 * Fetches coffee data by a filter and returns the resulting data.
 * @param filter A Filter to be applied to the collection.
 * @returns {Promise<unknown>} A Promise to the filtered documents array.
 */
async function getByFilter(filter) {
    const client = new MongoClient(uri);
    try {
        return await client.connect().then(() => {
            return new Promise(function (resolve, reject) {
                client.db('coffee_db')
                    .collection("coffee")
                    // Search using the predefined index.
                    .find({$text: { $search : filter}})
                    // Adjust collation to get case and diacritic insensitive result.
                    .collation( { locale: "en_US", strength: 1 } )
                    .toArray(function (err, docs) {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(docs);
                    });
            });
        });
    } catch (err) {
        return err;
    } finally {
        if (client) await client.close();
    }
}

module.exports = {getAll, getByFilter, getByCategory};