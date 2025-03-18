import { FastifyInstance } from "fastify";
import { RegisterUsersRoute } from "./register";
import { DeleteUsersRoute } from "./delete";
import { ReadUsersRoute } from "./read";
import { AuthenticateUsersRoute } from "./authenticate";
import { refreshUserRoute } from "./refresh";

export async function usersRoutes(app: FastifyInstance) {
  app.register(RegisterUsersRoute)
  app.register(DeleteUsersRoute)
  app.register(ReadUsersRoute)
  app.register(AuthenticateUsersRoute)
  app.register(refreshUserRoute)
}
