import { AuthenticationStrategy } from '@loopback/authentication';
import { inject } from '@loopback/core';
import { RedirectRoute, Request } from '@loopback/rest';
import { UserProfile } from '@loopback/security';

import { KratosComponentBindings } from '../keys';
import { KratosUserService } from '../services';

export class KratosAuthenticationStrategy implements AuthenticationStrategy {
  name = 'kratos';

  constructor(
    @inject(KratosComponentBindings.USER_SERVICE.key)
    private userService: KratosUserService) {
  }

  async authenticate(request: Request): Promise<UserProfile | RedirectRoute | undefined> {
    const sessionToken: string | undefined = request.headers.authorization;
    if(!sessionToken) {
      return undefined;
    }

    const userId: string | undefined = await this.userService.verifyCredentials(sessionToken);
    if(!userId) {
      return undefined;
    }

    const userProfile = this.userService.convertToUserProfile(userId);
    return userProfile;
  }
}
