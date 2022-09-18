import { inject, Provider } from '@loopback/core';
import { HttpErrors } from '@loopback/rest';
import { getService } from '@loopback/service-proxy';

import { KratosAPI } from '../datasources';
import { KratosComponentBindings } from '../keys';
import { KratosComponentOptions } from '../types';

export interface KratosProxy {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  whoAmI(sessionToken: string): Promise<KratosSession>
}

export interface KratosSession {
  id: string,
  active: boolean,
}

export class KratosProxyProvider implements Provider<KratosProxy> {
  protected dataSource: KratosAPI;

  constructor(
    @inject(KratosComponentBindings.CONFIG.key) options?: KratosComponentOptions,
  ) {
    if (!options) {
      throw new HttpErrors.UnprocessableEntity('Kratos config not available !');
    }

    this.dataSource = new KratosAPI(options);
  }

  value(): Promise<KratosProxy> {
    return getService(this.dataSource);
  }
}
