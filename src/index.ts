import { runserver, RestServer } from './server';
import app from './app';

const restServer = new RestServer(app);
runserver(restServer);
