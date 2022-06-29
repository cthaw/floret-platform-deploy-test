import app from './app';
import { PORT } from './constants';
import logger from './logger';
import { connect } from './db';

connect()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`App running on port ${PORT}`);
    });
  })
  .catch(() => {
    logger.error('Error connecting to database. App cannot start.');
    process.exit();
  });
