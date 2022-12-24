import {AuthenticationStrategy} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {RedirectRoute, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {Session} from '@ory/kratos-client';

import {KratosComponentBindings} from '../keys';
import {KratosUserService} from '../services';

export class KratosAuthenticationStrategy implements AuthenticationStrategy {
  name = 'kratos';

  constructor(
    @inject(KratosComponentBindings.USER_SERVICE.key)
    private userService: KratosUserService,
  ) {}

  async authenticate(
    request: Request,
  ): Promise<UserProfile | RedirectRoute | undefined> {
    const sessionToken: string | undefined = request.headers.authorization;
    if (!sessionToken) {
      return undefined;
    }

    const userId: Session | null = await this.userService.verifyCredentials(
      sessionToken,
    );
    if (userId == null) {
      return undefined;
    }

    return this.userService.convertToUserProfile(userId);
  }
}
