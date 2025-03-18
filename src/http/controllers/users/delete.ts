import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { makeDeleteUserUseCase } from 'src/user/factories/make-Delete-user-use-case'
import z from 'zod'

import { ResourceNotFoundError } from '@/user/use-cases/errors/resource-not-found-error'

export async function DeleteUsersRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/users/:userId',
    {
      schema: {
        summary: 'Delete an user',
        tags: ['users'],
        params: z.object({
          userId: z.string().uuid(),
        }),
        response: {
          204: z.object({}),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { userId } = req.params

      const DeleteUserUseCase = makeDeleteUserUseCase()

      const result = await DeleteUserUseCase.execute({ userId })

      if (result.isLeft()) {
        return res
          .status(404)
          .send({ message: new ResourceNotFoundError().message })
      }

      return res.status(204).send()
    },
  )
}
