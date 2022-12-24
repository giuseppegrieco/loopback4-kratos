import {UserService} from '@loopback/authentication';
import {BindingScope, inject, injectable} from '@loopback/core';
import {securityId, UserProfile} from '@loopback/security';

import {KratosComponentBindings} from '../keys';
import {KratosProxy} from './proxy.service';
import {KratosComponentOptions} from '../types';
import {Session} from '@ory/kratos-client';

@injectable({scope: BindingScope.TRANSIENT})
export class KratosUserService implements UserService<Session | null, string> {
  constructor(
    @inject(KratosComponentBindings.PROXY.key) private proxy: KratosProxy,
    @inject(KratosComponentBindings.CONFIG)
    private config: KratosComponentOptions,
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
    const ans = {
      [securityId]: response.id,
    };
    return this.config.extractUserProfileStrategy(ans, response);
  }
}
