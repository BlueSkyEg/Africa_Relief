import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { RESPONSE } from './server.token';
import { existsSync, readFileSync } from 'node:fs';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Mocked backend or JSON file with redirects
  const fetchRedirects = async () => {
    const redirectsFilePath = join(process.cwd(), 'dist/africa-relief/browser/assets/redirects.json');

    let redirects = [];
    if (existsSync(redirectsFilePath)) {
      redirects = JSON.parse(readFileSync(redirectsFilePath, 'utf-8'));
    }

    return redirects;
  };

  // Handle redirects dynamically
  server.use(async (req, res, next) => {
    const redirects = await fetchRedirects();
    const redirect = redirects.find((r) => r.from === req.path);

    if (redirect) {
      res.redirect(redirect.statusCode, redirect.to);
    } else {
      next();
    }
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {maxAge: '1y'}));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
          { provide: RESPONSE, useValue: res }
        ],
      })
      .then((html) => !res.headersSent ? res.send(html) : undefined)
      .catch((err) => next(err));
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

run();
