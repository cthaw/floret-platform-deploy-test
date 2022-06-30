import express from 'express';
import history from 'connect-history-api-fallback';
import compression from 'compression';
import cors from 'cors';
import fs from 'fs';
import { CLIENT_DIR } from './constants';
import routes from './routes';
import {
  PLATFORM_SERVER_BASE_URL,
  PLATFORM_SERVER_BASE_URL_REGEX,
  AUTH0_DOMAIN,
  AUTH0_DOMAIN_REGEX,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_ID_REGEX,
  APP_JS_REGEX,
} from './config';

const app = express();

app.use(express.json());
app.use(cors());
app.use(compression());
app.use(history({
  index: '/',
  rewrites: [
    {
      from: /^\/api\/.*$/,
      to(context) {
        return context.parsedUrl.path ?? context.parsedUrl.href;
      },
    },
  ],
}));
app.get('/js/:filename', (req: express.Request, res: express.Response) => {
  fs.readFile(CLIENT_DIR + req.url, 'utf-8', (error, data) => {
    if (APP_JS_REGEX.test(req.url)) {
      res.end(
        data.replace(PLATFORM_SERVER_BASE_URL_REGEX, PLATFORM_SERVER_BASE_URL)
          .replace(AUTH0_DOMAIN_REGEX, AUTH0_DOMAIN)
          .replace(AUTH0_CLIENT_ID_REGEX, AUTH0_CLIENT_ID),
      );
    } else {
      res.end(data);
    }
  });
});
app.use(express.static(CLIENT_DIR));
app.use(routes);

export default app;
