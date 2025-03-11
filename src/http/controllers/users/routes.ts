import { FastifyInstance } from "fastify";
import { CreateUsersRoute } from "./create";

export async function usersRoutes(app: FastifyInstance) {
  app.register(CreateUsersRoute)
}
