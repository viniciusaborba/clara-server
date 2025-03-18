import { FastifyInstance } from 'fastify'

import { CreateUsersRoute } from './create'
import { DeleteUsersRoute } from './delete'
import { ReadUsersRoute } from './read'

export async function usersRoutes(app: FastifyInstance) {
  app.register(CreateUsersRoute)
  app.register(DeleteUsersRoute)
  app.register(ReadUsersRoute)
}
