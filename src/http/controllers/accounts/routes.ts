import { FastifyInstance } from 'fastify'
import { RegisterAccountsRoute } from './create'

export async function accountsRoutes(app: FastifyInstance) {
  app.register(RegisterAccountsRoute)
}
