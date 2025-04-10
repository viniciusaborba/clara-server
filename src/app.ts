import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { usersRoutes } from './http/controllers/users/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { accountsRoutes } from './http/controllers/accounts/routes'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'clara',
      description: 'API Documentation for Clara server application',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifySwaggerUi, {
  routePrefix: '/api/v1/docs',
})

app.register(
  async (app) => {
    app.register(usersRoutes), app.register(accountsRoutes)
  },
  { prefix: '/api/v1' }
)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
