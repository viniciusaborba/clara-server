import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { makeReadUserUseCase } from 'src/user/factories/make-read-user-use-case' // Corrigido nome do arquivo
import z from 'zod'

import { UserMapper } from '@/user/mapper'
import { ResourceNotFoundError } from '@/user/use-cases/errors/resource-not-found-error'

export async function ReadUsersRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/:userId',
    {
      schema: {
        summary: 'Read an user',
        tags: ['users'],
        params: z.object({
          userId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            user: z.object({
              id: z.string().uuid(),
              name: z.string().optional().nullable(),
              email: z.string().email(),
              phone: z.string(),
              username: z.string(),
              createdAt: z.date(),
              updatedAt: z.date().nullable(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { userId } = req.params

      const readUserUseCase = makeReadUserUseCase()

      const result = await readUserUseCase.execute({ userId })

      if (result.isLeft()) {
        return res
          .status(404)
          .send({ message: new ResourceNotFoundError().message })
      }

      const user = result.value.user

      return res.status(200).send({
        // user: {
        //   id: user.id,
        //   name: user.name ?? null,
        //   email: user.email,
        //   phone: user.phone,
        //   username: user.username,
        //   createdAt: user.createdAt,
        //   updatedAt: user.updatedAt ?? null,
        // }
        user: UserMapper.toPersistence(user),
      })
    },
  )
}
