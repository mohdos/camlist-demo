
import { vars } from './config/index';
import app from './loaders/express';

function startServer()
{
    app.listen(vars.port, () => {
        console.log("Listening on ", vars.port);
    });
}

startServer();
