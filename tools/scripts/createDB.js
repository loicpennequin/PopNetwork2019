const path = require('path');
const mysql = require('mysql');
const chalk = require('chalk');
require(path.resolve(__dirname, './../../config/env.js'));

const connexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

if (!process.env.DB_NAME) {
    const envPath = chalk.bold.white('./config/.env');

    console.log(
        chalk.red(`
The database has not been created because your .env configuration is incorrect. Please check the file located at ${envPath}
    `)
    );
    process.exit();
} else {
    connexion.connect(err => {
        if (err) throw err;
        console.log('Connected to MySQL.');
        console.log('Creating Database...');
        const sql = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`;
        connexion.query(sql, (err, result) => {
            if (err) throw err;
            console.log(chalk.bold('Database created. All done !'));
            process.exit();
        });
    });
}
