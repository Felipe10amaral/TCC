import fastify from 'fastify';

import { appRoutes } from './routes/routes';
import { ZodError } from 'zod';
import { env } from './env';

export const app = fastify();

app.register(appRoutes)



