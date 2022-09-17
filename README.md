# kratos

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

## Installation

Install KratosComponent using `npm`;

```sh
$ [npm install | yarn add] kratos
```

## Basic Use

Configure and load KratosComponent in the application constructor
as shown below.

```ts
import {KratosComponent, KratosComponentOptions, DEFAULT_KRATOS_OPTIONS} from 'kratos';
// ...
export class MyApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
  constructor(options: ApplicationConfig = {}) {
    const opts: KratosComponentOptions = DEFAULT_KRATOS_OPTIONS;
    this.configure(KratosComponentBindings.COMPONENT).to(opts);
      // Put the configuration options here
    });
    this.component(KratosComponent);
    // ...
  }
  // ...
}
```
