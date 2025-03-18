import { makeAuthenticateUserUseCase } from "@/user/factories/make-authenticate-user-use-case";
import { InvalidCredentialsError } from "@/user/use-cases/errors/invalid-credentials-error";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

export async function AuthenticateUsersRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/sessions",
    {
      schema: {
        summary: "Authenticate an user",
        tags: ["users"],
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6).max(50),
        })
      }
    },
    async (req, res) => {
      const {email, password } = req.body;

      const authenticateUserUseCase = makeAuthenticateUserUseCase()

      const result = await authenticateUserUseCase.execute({
        email,
        password
      });

      if (result.isLeft()) {
        return res.status(400).send({ message: new InvalidCredentialsError().message });
      }

      const user = result.value.user;

      const token = await res.jwtSign(
        {
          sign: {
            sub: user.id,
          },
        }
      );
       
      return res.status(200).send({ token });
    }
  )
}
