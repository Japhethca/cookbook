import http, { Server } from 'http';

interface APIServer {
  run: () => Promise<any>;
}

export class RestServer extends Server implements APIServer {
  private port: string;

  constructor(app: http.RequestListener) {
    super(app);
    this.port = process.env.PORT || '5000';
  }

  async run() {
    this.listen(this.port, () => {
      console.log(`listening on port ${this.port}`);
    });
  }
}

export const runserver = (server: APIServer) => server.run();

export function runservers(servers: APIServer[]) {
  servers.forEach(runserver);
}
