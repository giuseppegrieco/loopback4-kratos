import {inject, Provider} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {getService} from '@loopback/service-proxy';

import {KratosAPI} from '../datasources';
import {KratosComponentBindings} from '../keys';
import {KratosComponentOptions} from '../types';


export type KratosResponse = {
  id: string,
  active: boolean,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  expires_at: string,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  authenticated_at: string,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  authenticator_assurance_level: string,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  authentication_methods: Array<{
    [prop: string]: string | number
  }>,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  issued_at: string,
  identity: {
    id: string,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    schema_id: string,
    state: string,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    state_changed_at: string,
    traits: {
      [prop: string]: string | number | boolean | {
        [prop: string]: string | number | boolean
      }
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    verifiable_addresses?: Array<{
      id: string,
      value: string,
      verified: boolean,
      via: string,
      status: string,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      created_at: string,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      updated_at: string
    }>,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    recovery_addresses?: Array<{
      id: string,
      value: string,
      via: string,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      created_at: string,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      updated_at: string
    }>
    // eslint-disable-next-line @typescript-eslint/naming-convention
    metadata_public?: {
      [prop: string]: string | number
    } | null | string,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    created_at: string
    // eslint-disable-next-line @typescript-eslint/naming-convention
    updated_at: string
  }
  devices: Array<{
    id: string,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ip_address: string,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    user_agent: string,
    location: string
  }>
}

export interface KratosProxy {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  whoAmI(sessionToken: string): Promise<KratosResponse>;
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
