const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { router } = require('./router');
const app = express();
const port = 3000;

class Server {
    static bootstrap() {
        return new Server();
    }

    constructor() {
        this.configureApp();
        this.configureServer();
    }

    configureApp() {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(methodOverride());
        app.use('/', router);
    }

    async configureServer() {
        try {
            app.listen(port, () =>
                console.log(`server started on port ${port}`)
            );
        } catch (error) {
            console.log('Unable to start server', error);
        }
    }
}

exports = Server.bootstrap();
