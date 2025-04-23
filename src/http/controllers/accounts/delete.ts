import { ResourceNotFoundError } from '@/user/use-cases/errors/resource-not-found-error'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { makeDeleteAccountUseCase } from 'src/account/factories/make-Delete-account-use-case'
import z from 'zod'

export async function DeleteAccountsRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/accounts/:accountId',
    {
      schema: {
        summary: 'Delete an account',
        tags: ['accounts'],
        params: z.object({
          accountId: z.string().uuid(),
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
      const { accountId } = req.params

      const DeleteAccountUseCase = makeDeleteAccountUseCase()

      const result = await DeleteAccountUseCase.execute({ accountId })

      if (result.isLeft()) {
        return res
          .status(404)
          .send({ message: new ResourceNotFoundError().message })
      }

      return res.status(204).send()
    },
  )
}
