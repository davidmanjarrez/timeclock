const Pool = require('pg').Pool;

//TODO: All kinds of abstractions and refactoring
const pool = new Pool({
    user: 'dave',
    password: 'C0k31324!',
    host: 'localhost',
    database: 'timeclock',
    port: 5432,
});

async function runQuery(sql, params) {

    const client = await pool.connect();

    return client.query(sql, params).then(result => {
        client.release();
        console.debug(result.rows.length + ' results returned.');
        console.debug(result.rows);
        return result.rows;
    }).catch(error => {
        return console.debug('error running query', error);
    });
}

module.exports = runQuery;
