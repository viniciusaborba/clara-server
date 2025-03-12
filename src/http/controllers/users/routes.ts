import { FastifyInstance } from "fastify";
import { CreateUsersRoute } from "./create";
import { DeleteUsersRoute } from "./delete";

export async function usersRoutes(app: FastifyInstance) {
  app.register(CreateUsersRoute)
  app.register(DeleteUsersRoute)
}
