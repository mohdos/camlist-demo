
import { vars } from './config';
import {app} from './loaders';

function startServer()
{
    app.listen(vars.port, () => {
        console.log("Listening on ", vars.port);
    });
}

startServer();
