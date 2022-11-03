const { logInfo } = require('lib');
const db = require('db/repository');
const R = require('ramda');
module.exports = function (req, res) {
    logInfo('Request to get health-check db api', {});

    db.getConnectionState().then((state) => {
        const status = R.cond([
            [R.equals(0), () => 'disconnected'],
            [R.equals(1), () => 'connected'],
            [R.equals(2), () => 'connecting'],
            [R.equals(3), () => 'disconnecting'],
        ])(state);
        res.json({
            status
        });
    })
}