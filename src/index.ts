import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import mongoose from 'mongoose';
import {
  REDIS_OPTIONS,
  SESSION_OPTIONS,
  APP_PORT,
  MONGO_URI,
  MONGO_OPTIONS,
} from './config';

(async () => {
  try {
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
  const RedisStore = connectRedis(session);

  const client = new Redis(REDIS_OPTIONS);

  const app = express();

  app.use(session({ ...SESSION_OPTIONS, store: new RedisStore({ client }) }));

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.listen(APP_PORT, () => {
    console.log(`App listening at http://localhost:${APP_PORT}`);
  });
  } catch(error) {
    console.error(error)
  }
})();
