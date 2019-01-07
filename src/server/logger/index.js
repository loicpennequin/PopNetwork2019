/**
 * Logger configuration.
 *
 * @author Daria <lo.pennequin@gmail.com>
 */

import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import path from 'path';
import { cfg } from './../../../config';

const { combine, timestamp, label, printf, colorize } = format;
const { LOGGER } = cfg;

let logger;

/**
 * creates winston Logger
 * @return {Object} the instanciated logger
 */
const initLogger = () => {
    if (!fs.existsSync(LOGGER.DIR)) {
        fs.mkdirSync(LOGGER.DIR);
    }

    logger = createLogger({
        level: process.env.LOG_LEVEL,
        format: format.combine(colorize(), LOGGER.FORMAT(printf)),
        // defaultMeta: {service: 'user-service'},
        transports: [
            new transports.Console({ level: 'debug' }),
            new transports.File({
                filename: path.join(LOGGER.DIR, 'error.log'),
                level: 'error',
                format: format.json()
            })
        ]
    });
    logger.debug('Logger Initiated');
    return logger;
};

export default {
    error: message => logger?.error(message),
    warn: message => logger?.warn(message),
    info: message => logger?.info(message),
    verbose: message => logger?.verbose(message),
    debug: message => logger?.debug(message),
    silly: message => logger?.silly(message)
};

export { initLogger };
