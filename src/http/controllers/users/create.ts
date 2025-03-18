import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { makeCreateUserUseCase } from 'src/user/factories/make-create-user-use-case'
import z from 'zod'

import { UserAlreadyExistsError } from '@/user/use-cases/errors/user-already-exists-error'

export async function CreateUsersRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        summary: 'Create new user',
        tags: ['users'],
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

      const createUserUseCase = makeCreateUserUseCase()

      const result = await createUserUseCase.execute({
        name,
        email,
        password,
        username,
        phone,
      })

      if (result.isLeft()) {
        return res
          .status(400)
          .send({ message: new UserAlreadyExistsError(email).message })
      }

      return res.status(201).send()
    },
  )
}
