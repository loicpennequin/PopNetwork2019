(async function(){
    const prompt = require('prompt');
    const fs = require('fs');
    const path = require('path');
    const { promisify } = require('util');
    const read = promisify(fs.readFile);
    const write = promisify(fs.writeFile);

    function setup(){
        const schema = {
            properties: {
                database_host: {
                    default: 'localhost'
                },
                database_name: {
                    default: 'chatapp'
                },
                database_user: {
                    default: 'root'
                },
                database_password: {
                    hidden: true,
                    replace: '*',
                    before: value => value ? value : "''"
                }
            }
        }

        console.log('Please fill in your MySQL credentials :');
        prompt.start();

        prompt.get(schema, async (err, result) => {

            const ENV_PATH = path.join(__dirname, './../../config');

            const sample = (await read(path.join(ENV_PATH, '.env-sample')))
            .toString()
            .split("\n");

            let host = sample.find(line => line === 'DB_HOST =\r') + result.database_host;
            let name = sample.find(line => line === 'DB_NAME =\r') + result.database_name;
            let user = sample.find(line => line === 'DB_USER =\r') + result.database_user;
            let password = sample.find(line => line === 'DB_PASSWORD =\r') + result.database_password;

            sample[sample.findIndex(line => line === 'DB_HOST =\r')] = host;
            sample[sample.findIndex(line => line === 'DB_NAME =\r')] = name;
            sample[sample.findIndex(line => line === 'DB_USER =\r')] = user;
            sample[sample.findIndex(line => line === 'DB_PASSWORD =\r')] = password;

            const validationSchema = {
                properties: {
                    confirm: {
                        pattern: /^[yn]/,
                        description: "Are you sure ? (y/n)",
                        message: "Sorry, I didn't understand that. Please enter y for Yes, or n for No. Are you sure? (y/n)",
                    }
                }
            }
            prompt.start();
            prompt.get(validationSchema, async (arr, result) => {
                if (result.confirm === "y"){
                    await write(path.join(ENV_PATH, '.env'), sample.join("\n"));
                    console.log('.env file generated.');
                } else {
                    setup();
                }
            })
        });
    }

    setup();
})()
