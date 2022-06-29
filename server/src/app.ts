import express from 'express';
import history from 'connect-history-api-fallback';
import compression from 'compression';
import cors from 'cors';
import { CLIENT_DIR } from './constants';
import routes from './routes';

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
app.use(express.static(CLIENT_DIR));
app.use(routes);

export default app;
