import { lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';

import { KratosComponentOptions } from '../types';

@lifeCycleObserver('datasource')
export class KratosAPI extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'KratosAPI';

  constructor(options: KratosComponentOptions) {
    super({
      name: 'Kratos',
      connector: 'rest',
      baseURL: options.baseUrl,
      crud: false,
      operations: [
        {
          template: {
            method: 'GET',
            fullResponse: false,
            url: options.baseUrl + '/api/kratos/public/sessions/whoami',
            headers: {
              'X-Session-Token': '{sessionToken}'
            },
          },
          functions: {
            'whoAmI': ['sessionToken']
          }
        }
      ]
    });
  }
}
