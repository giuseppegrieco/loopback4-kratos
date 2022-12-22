# @snap-room/loopback-kratos

A simple Ory Kratos integration in loopback applications.

[![LoopBack](<https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)

## Installation

Install KratosComponent using `npm`;

```sh
$ [npm install | yarn add] kratos
```

## Basic Use

```ts
import {AuthenticationComponent} from '@loopback/authentication';

import {KratosComponent, KratosComponentOptions} from 'kratos';

// ...

export class MyApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    // ...

    this.component(AuthenticationComponent);

    this.component(KratosComponent);
    this.bind(KratosComponentBindings.CONFIG).to({
      baseUrl: 'http://kratos_url',
      extractUserProfileStrategy: (baseUserProfile: UserProfile, response: KratosResponse) => {
        let userProfile = baseUserProfile;

        //implements your own extract strategy

        return userProfile;
      }
    });

    // ...
  }

  // ...
}
```

After this, you can just use Kratos as authentication strategy across application.

```ts
import {authenticate} from '@loopback/authentication';
import {get} from '@loopback/rest';

// ...

export class YourController {
  @get('/foo')
  @authenticate('kratos')
  foo() {
    // this request is protected by kratos authentication
  }

  // ...
}
```
