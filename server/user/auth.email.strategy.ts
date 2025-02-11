import { User } from '@prisma/client'
import { Request as ExpressRequest } from 'express'
import { GraphQLLocalStrategy } from 'graphql-passport'
import { AuthenticationMessage, AuthService } from './auth.service'

export default class EmailStrategy extends GraphQLLocalStrategy<
  User,
  ExpressRequest
> {
  constructor(private authService: AuthService) {
    super(
      async (
        email: unknown,
        password: unknown,
        done: (
          error: Error | null,
          user?: User | null,
          message?: AuthenticationMessage
        ) => void
      ) => {
        try {
          const user = await this.authService.validateUser(
            email as string,
            password as string
          )
          if ('user' in user) {
            // Authentication succeeded
            done(null, await user.user)
          } else {
            // Wrong email-password combination
            done(null, null, {
              message: 'Wrong email or password.',
              info: false,
            })
          }
        } catch (err) {
          done(err as Error)
        }
      }
    )
  }
}
