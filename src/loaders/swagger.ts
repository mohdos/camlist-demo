
import * as express from 'express';

import * as SwaggerUi from 'swagger-ui-express';

export function setupSwagger(app: express.Application, urlPath: string = "/docs") {
    app.use(
        urlPath,
        SwaggerUi.serve,
        SwaggerUi.setup(require('../../api-docs.json'))
    )
}

