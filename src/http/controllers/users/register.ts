import { UserAlreadyExistsError } from "@/user/use-cases/errors/user-already-exists-error";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { makeRegisterUserUseCase } from "@/user/factories/make-register-user-use-case";
import { z } from "zod";
import { UsernameAlreadyInUseError } from "@/user/use-cases/errors/username-already-in-use";

export async function RegisterUsersRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        summary: "Register new user",
        tags: ["users"],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          username: z.string().min(4).max(20),
          password: z.string().min(6).max(50),
          phone: z.string().min(11).max(11),
        }),
      },
    },
    async (req, res) => {
      const { name, email, password, username, phone } = req.body

      const registerUserUseCase = makeRegisterUserUseCase()

      const result = await registerUserUseCase.execute({
        name,
        email,
        password,
        username,
        phone,
      })

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case UserAlreadyExistsError:
            return res.status(409).send({
              message: error.message,
            });
          case UsernameAlreadyInUseError:
            return res.status(409).send({
              message: error.message,
            });
          default:
            return res.status(500).send({
              message: "An unexpected error occurred",
            });
        }
      }

      return res.status(201).send()
    },
  )
}
