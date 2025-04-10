import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { makeCreateAccountUseCase } from '@/account/factories/make-create-account-use-case'
import { AccountAlreadyExistsError } from '@/account/use-cases/errors/account-alredy-exists'
import { UserNotFoundError } from '@/account/use-cases/errors/user-not-found'

export async function RegisterAccountsRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/accounts',
    {
      schema: {
        summary: 'Register new account',
        tags: ['accounts'],
        body: z.object({
          name: z.string(),
          balance: z.number(),
          userId: z.string().uuid(),
        }),
      },
    },
    async (req, res) => {
      const { name, balance, userId } = req.body

      const createAccountUseCase = makeCreateAccountUseCase()

      const result = await createAccountUseCase.execute({
        name,
        balance: new Prisma.Decimal(balance),
        userId,
      })

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case AccountAlreadyExistsError:
            return res.status(409).send({
              message: error.message,
            })
          case UserNotFoundError:
            return res.status(404).send({
              message: error.message,
            })
          default:
            return res.status(500).send({
              message: 'An unexpected error occurred',
            })
        }
      }

      return res.status(201).send()
    }
  )
}
