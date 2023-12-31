import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import session from 'express-session';
import passport from '@Services/auth';
import cors from 'cors';
import 'dotenv/config';
import { randomUUID } from 'crypto';

import {
  ErrorHandler,
  boomErrorHandlr,
  logErrors,
} from '@Middlewares/Error.middleware';
import Guild from '@Routers/Guild.router';
import Members from '@Routers/Members.router';
import Tickets from '@Routers/Tickets.router';
import Premiums from '@Routers/Premiums.router';
import Tokens from '@Routers/Tokens.router';
import Auth from '@Routers/auth.router';
import Index from '@Routers/Index.router';

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(
  session({
    secret: randomUUID(),
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/guilds', Guild);
app.use('/members', Members);
app.use('/tickets', Tickets);
app.use('/premiums', Premiums);
app.use('/tokens', Tokens);
app.use('/auth', Auth);
app.use('/', Index);
app.use(logErrors);
app.use(boomErrorHandlr);
app.use(ErrorHandler);

export default app;
