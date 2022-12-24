import {get, RestComponent} from '@loopback/rest';
import {Application, inject} from '@loopback/core';
import {
  authenticate,
  AuthenticationBindings,
  AuthenticationComponent,
} from '@loopback/authentication';
import {KratosComponent} from '../../component';
import {KratosComponentBindings} from '../../keys';
import {UserProfile} from '@loopback/security';
import {KratosProxy} from '../../services';
import {Session} from '@ory/kratos-client';

class KratosTestController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER)
    private readonly user: UserProfile,
  ) {}

  @get('/test')
  @authenticate('kratos')
  async test() {
    return this.user;
  }
}

class KratosProxyTest implements KratosProxy {
  whoAmI(sessionToken: string): Promise<Session> {
    if (sessionToken === 'Bearer of18SyPbs3Odsa23adfFASDASDA31D12') {
      return new Promise<Session>((resolve, _) => {
        resolve(kratosTestResponse);
      });
    }
    throw Error();
  }
}

export default function createApplication() {
  const app = new Application();
  app.component(RestComponent);

  app.component(AuthenticationComponent);

  app.component(KratosComponent);
  app.bind(KratosComponentBindings.CONFIG).to({
    baseUrl: 'not used for testing',
    extractUserProfileStrategy: (
      baseUserProfile: UserProfile,
      response: Session,
    ) => {
      const userProfile = baseUserProfile;

      userProfile.username = response.identity.traits.username;

      return userProfile;
    },
  });

  app.controller(KratosTestController);

  app.bind(KratosComponentBindings.PROXY.key).to(new KratosProxyTest());

  return app;
}

const kratosTestResponse: Session = {
  id: '65dea6f4-5d15-4e61-9eb7-f30190c0b2e2',
  active: true,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  expires_at: '2022-12-31T13:50:30.427292Z',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  authenticated_at: '2022-12-01T13:50:30.825516Z',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  authenticator_assurance_level: 'aal1',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  authentication_methods: [
    {
      method: 'password',
      aal: 'aal1',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      completed_at: '2022-12-01T13:50:30.427375604Z',
    },
  ],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  issued_at: '2022-12-01T13:50:30.427292Z',
  identity: {
    id: '969d7a6e-b8a9-49ea-bf7b-9e2732a41a81',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    schema_url: 'test value',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    schema_id:
      '9cadbdf1d6bc5c5c521a1c17ea83648c911c5cd74a14d9e6cc11a5790d133339c3524f8a2d35d34f4151d2df10a7b73d19f7bd0f709fd5ace9019e080bbc4df6',
    state: 'active',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    state_changed_at: '2022-12-01T13:50:30.331786Z',
    traits: {
      consent: {
        newsletter: false,
        tos: '2022-12-01T13:50:28.706Z',
      },
      email: 'user@example.org',
      name: 'User',
      username: 'Test',
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    verifiable_addresses: [
      {
        id: 'f5f4afde-697e-4e10-a6b6-f870dce927d6',
        value: 'user@example.org',
        verified: false,
        via: 'email',
        status: 'sent',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        created_at: '2022-12-01T13:50:30.345386Z',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        updated_at: '2022-12-01T13:50:30.345386Z',
      },
    ],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    recovery_addresses: [
      {
        id: '6e16a3b4-518f-4a5a-b045-95177deb40f1',
        value: 'user@example.org',
        via: 'email',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        created_at: '2022-12-01T13:50:30.35227Z',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        updated_at: '2022-12-01T13:50:30.35227Z',
      },
    ],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    metadata_public: null,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    created_at: '2022-12-01T13:50:30.340643Z',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    updated_at: '2022-12-01T13:50:30.340643Z',
  },
  devices: [
    {
      id: '592515ee-7b70-4e08-b4d7-fb0b1643cb48',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ip_address: '2001:a61:1101:8001:cc85:1111:2222:3333',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      user_agent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
      location: 'Berlin, DE',
    },
  ],
};
