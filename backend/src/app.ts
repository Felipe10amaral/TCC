import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { appRoutes } from './routes/routes';
import { ZodError } from 'zod';
import { env } from './env/index';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  
});

app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
  if(error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    });
  }
  
    console.error(error);
  reply.status(500).send({ error: 'Internal Server Error' });
});



