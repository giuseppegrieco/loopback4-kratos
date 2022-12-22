import {inject, Provider} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {getService} from '@loopback/service-proxy';

import {KratosAPI} from '../datasources';
import {KratosComponentBindings} from '../keys';
import {KratosComponentOptions} from '../types';


export type KratosResponse = {
    id: string,
    active: boolean,
    expires_at: string,
    authenticated_at: string,
    authenticator_assurance_level: string,
    authentication_methods: Array<Object>,
    issued_at: string,
    identity: {
        id: string,
        schema_id: string,
        state: string,
        state_changed_at: string,
        traits: Object,
        verifiable_addresses?: Array<{
            id: string,
            value: string,
            verified: boolean,
            via: string,
            status: string,
            created_at: string,
            updated_at: string
        }>,
        recovery_addresses?: Array<{
            id: string,
            value: string,
            via: string,
            created_at: string,
            updated_at: string
        }>
        metadata_public?: Object
        created_at: string
        updated_at: string
    }
    devices: Array<{
        id: string,
        ip_address: string,
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
