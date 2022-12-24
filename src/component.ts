import {registerAuthenticationStrategy} from '@loopback/authentication';
import {
  injectable,
  ContextTags,
  Binding,
  Component,
  inject,
  CoreBindings,
  Application,
} from '@loopback/core';

import {KratosComponentBindings} from './keys';
import {KratosAuthenticationStrategy} from './providers';
import {KratosProxyProvider, KratosUserService} from './services';

// Configure the binding for KratosComponent
@injectable({tags: {[ContextTags.KEY]: KratosComponentBindings.COMPONENT}})
export class KratosComponent implements Component {
  bindings: Binding[] = [
    Binding.bind(KratosComponentBindings.PROXY.key).toProvider(
      KratosProxyProvider,
    ),
    Binding.bind(KratosComponentBindings.USER_SERVICE.key).toClass(
      KratosUserService,
    ),
  ];

  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private application: Application,
  ) {
    /**
     * Register kratos as an authentication strategy.
     *
     * See https://loopback.io/doc/en/lb4/Implement-your-own-strategy.html
     */
    registerAuthenticationStrategy(application, KratosAuthenticationStrategy);
  }
}
