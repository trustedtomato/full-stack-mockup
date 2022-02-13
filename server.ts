import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import fetch from 'node-fetch';
import { AppServerModule } from './src/main.server';
import { createDeepPartial } from './src/utils/create-deep-partial'

const photoApiFields = ['id', 'title', 'thumbnailUrl']

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/full-stack-mockup/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // REST API endpoints
  server.get('/api/photos', async (req, res, next) => {
    let {
      start = 0,
      limit = 10,
      sort = 'id'
    } = req.query

    // Only accept the last query paramter of the same type
    if (Array.isArray(start)) start = start[start.length - 1]
    if (Array.isArray(limit)) limit = limit[limit.length - 1]
    if (Array.isArray(sort)) sort = sort[sort.length - 1]

    // Convert query parameters to the expected types
    start = parseInt(String(start))
    limit = parseInt(String(limit))
    sort = String(sort)

    // Throw error when a query parameter is invalid
    if (Number.isNaN(start)) {
      return next(new Error('The start query parameter is invalid!'))
    }
    if (Number.isNaN(limit)) {
      return next(new Error('The limit query parameter is invalid!'))
    }
    if (limit < 1 || limit > 100) {
      return next(new Error('The limit query parameter must be between 1 and 100!'))
    }
    // Only enable sorting on public fields
    // to make sure we are not leaking sensitive details.
    if (!photoApiFields.includes(sort)) {
      return next(new Error(`The sort query parameter must be one of the following: ${JSON.stringify(photoApiFields)}`))
    }

    const photos: any = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}&_sort=${sort}`)
      .then(response => response.json())

    // We are filtering the results to
    // save bandwidth and to make sure
    // we are not leaking sensitive details.
    const filteredPhotos = createDeepPartial(photos, [
      Object.fromEntries(
        photoApiFields.map(field => [field, true])
      )
    ])

    res.send(filteredPhotos)
  });

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
