import { createConnection } from 'typeorm';

import { runserver, RestServer } from './server';
import app from './app';

(async () => {
  try {
    await createConnection();
  } catch (dberr) {
    console.log(dberr, 'error from database');
  }
})();

const restServer = new RestServer(app);
runserver(restServer);
