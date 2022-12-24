import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {securityId, UserProfile} from '@loopback/security';

import {KratosComponentBindings} from '../keys';
import {KratosProxy} from './proxy.service';
import {Session} from '@ory/kratos-client';

export class KratosUserService implements UserService<Session | null, string> {
  constructor(
    @inject(KratosComponentBindings.PROXY.key) private proxy: KratosProxy,
  ) {}

  async verifyCredentials(sessionToken: string): Promise<Session | null> {
    try {
      const res = await this.proxy.whoAmI(sessionToken);
      if (res.active) {
        return res;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  convertToUserProfile(response: Session): UserProfile {
    return {
      [securityId]: response.id,
    };
  }
}
