import path from 'path';
import { env } from './../../config';

(async function() {
    const { initLogger } = await import('./logger');
    const logger = initLogger();
    const { default: app } = await import('./app.js');
    const { PORT } = process.env;

    app.start(PORT, () => {
        logger.info(`Server started on port ${PORT}`);
    });
})();
