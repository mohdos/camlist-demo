
import { vars } from './config';
import { seedDB } from './database/seeds';
import {app} from './loaders';

function startServer()
{
    app.listen(vars.port, () => {
        console.log("Listening on ", vars.port);
    });
    seedDB().then();
}

startServer();
