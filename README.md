# loopback4-kratos
[![NodeJS package](https://github.com/giuseppegrieco/loopback4-kratos/actions/workflows/npm.yml/badge.svg?branch=main)](https://github.com/giuseppegrieco/loopback4-kratos/actions/workflows/npm.yml)

A simple Ory Kratos integration in loopback4 applications.

[![LoopBack](<https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)

## Installation

Install KratosComponent using `npm`;

```sh
$ [npm install | yarn add] loopback4-kratos
```

## Basic Use

```ts
import {AuthenticationComponent} from '@loopback/authentication';

import {
  KratosComponentBindings,
  KratosComponent,
} from 'loopback4-kratos';

// ...

export class MyApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    // ...

    this.component(AuthenticationComponent);

    this.component(KratosComponent);
    this.bind(KratosComponentBindings.CONFIG).to({
      baseUrl: 'http://kratos_url'
    });
    
    // To register a custom user service
    this.bind(KratosComponentBindings.USER_SERVICE.key).toClass(
      MyUserService
    );

    // ...
  }

  // ...
}
```

It is therefore necessary to define a new user service:
```ts
import {UserProfile} from '@loopback/security';

import {
  KratosUserService
} from 'loopback4-kratos';
import {Session} from '@ory/kratos-client';

// ...

export class MyUserService extends KratosUserService {
  convertToUserProfile(response: Session): UserProfile {
    const ans = super.convertToUserProfile(response);
    
    // Implement your strategy ...
    
    return ans;
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
