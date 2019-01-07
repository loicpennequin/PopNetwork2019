/**
 * Environnement setup.
 * Since this file is used by scripts not transpiled by Babel (knex for example), we use commonJS syntax;
 * @author Daria <lo.pennequin@gmail.com>
 */

const path = require('path');

require('dotenv').config({ path: path.resolve(process.cwd(), 'config/.env') });
