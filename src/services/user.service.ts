import {UserService} from '@loopback/authentication';
import {BindingScope, inject, injectable} from '@loopback/core';
import {securityId, UserProfile} from '@loopback/security';

import {KratosComponentBindings} from '../keys';
import {KratosProxy, KratosResponse} from './proxy.service';
import {KratosComponentOptions} from '../types';

@injectable({scope: BindingScope.TRANSIENT})
export class KratosUserService implements UserService<KratosResponse | null, string> {
  constructor(
    @inject(KratosComponentBindings.PROXY.key) private proxy: KratosProxy,
    @inject(KratosComponentBindings.CONFIG) private config: KratosComponentOptions,
  ) {
  }

  async verifyCredentials(sessionToken: string):
    Promise<KratosResponse | null> {
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

  convertToUserProfile(response: KratosResponse): UserProfile {
    const ans = {
      [securityId]: response.id,
    };
    return this.config.extractUserProfileStrategy(ans, response);
  }
}
