import { Prisma } from '@prisma/client'

import { randomUUID } from 'node:crypto'

interface AccountProps {
  id: string
  name: string
  balance: Prisma.Decimal
  userId: string
}

export class Account {
  private readonly props: AccountProps

  constructor(props: AccountProps) {
    this.props = props
  }

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get balance() {
    return this.props.balance
  }

  get userId() {
    return this.props.userId
  }

  public static create(props: Omit<AccountProps, 'id'>): Account {
    const id = randomUUID()
    return new Account({ id, ...props })
  }
}
