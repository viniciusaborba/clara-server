import { FastifyInstance } from 'fastify'
import { RegisterAccountsRoute } from './create'
import { DeleteAccountsRoute } from './delete';

export async function accountsRoutes(app: FastifyInstance) {
  app.register(RegisterAccountsRoute);
  app.register(DeleteAccountsRoute);
}
