import { createConnection } from 'typeorm';

import { runserver, RestServer } from './server';
import app from './app';

(async () => await createConnection())();

const restServer = new RestServer(app);
runserver(restServer);
