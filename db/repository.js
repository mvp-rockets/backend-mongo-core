const mongoose = require('mongoose');
const config = require('config/config');
const Result = require('folktale/result');
const { logError } = require('lib');

const {
    username,
    password,
    host,
    port,
    database
} = config.db;

let url = '';
url = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;

console.log('db-url', url);
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected');
}).catch((error) => {
    console.log(error);
});

module.exports.getConnectionState = () => new Promise((resolve, reject) => {
    console.log("i am here")
    resolve(mongoose.connection.readyState)
});

module.exports.execute = async query => new Promise((resolve) => {
    query
        .get()
        .then((data) => {
            resolve(Result.Ok(data));
        })
        .catch((error) => {
            logError("Repository failed on execute", { query: query.constructor.name, error: error });
            resolve(Result.Error(error));
        });
});

module.exports.find = async query => new Promise((resolve) => {
    query
        .get()
        .then((data) => {
            resolve(Result.Ok(data));
        })
        .catch((error) => {
            logError("Repository failed on find", { query: query.constructor.name, error: error });
            resolve(Result.Error(error));
        });
});

module.exports.findOne = async query => new Promise((resolve) => {
    query
        .get()
        .then((data) => {
            resolve(Result.Ok(data));
        })
        .catch((error) => {
            logError("Repository failed on findOne", { query: query.constructor.name, error: error });
            resolve(Result.Error(error));
        });
});

module.exports.delete = async query => new Promise((resolve) => {
    query
        .get()
        .then((data) => {
            logError("Repository failed on delete", { query: query.constructor.name, error: error });
            resolve(Result.Ok(data));
        })
        .catch((error) => {
            resolve(Result.Error(error));
        });
});