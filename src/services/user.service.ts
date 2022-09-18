import { UserService } from '@loopback/authentication';
import { BindingScope, inject, injectable } from '@loopback/core';
import { securityId, UserProfile } from '@loopback/security';

import { KratosComponentBindings } from '../keys';
import {KratosProxy} from './proxy.service';

export interface KratosProfile extends UserProfile {
}

@injectable({scope: BindingScope.TRANSIENT})
export class KratosUserService implements UserService<string | undefined, string> {
  constructor(@inject(KratosComponentBindings.PROXY.key) private proxy: KratosProxy) {
    this.proxy = proxy;
  }

  async verifyCredentials(sessionToken: string): Promise<string | undefined> {
    try {
      const res = await this.proxy.whoAmI(sessionToken);
      if(res.active) {
        return res.id;
      }
    } catch (e) {
      return undefined;
    }
  }

  convertToUserProfile(userId: string): KratosProfile {
    const ans: KratosProfile = {
      [securityId]: userId,
    };
    return ans;
  }
}
