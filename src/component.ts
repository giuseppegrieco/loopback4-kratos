import {registerAuthenticationStrategy} from '@loopback/authentication';
import {
  injectable,
  ContextTags,
  Binding,
  Component,
  ProviderMap,
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
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private application: Application,
  ) {
    this.bindings.push(
      Binding.bind(KratosComponentBindings.PROXY.key).toProvider(
        KratosProxyProvider,
      ),
    );
    this.bindings.push(
      Binding.bind(KratosComponentBindings.USER_SERVICE.key).toInjectable(
        KratosUserService,
      ),
    );

    /**
     * Register kratos as an authentication strategy.
     *
     * See https://loopback.io/doc/en/lb4/Implement-your-own-strategy.html
     */
    registerAuthenticationStrategy(application, KratosAuthenticationStrategy);
  }

  providers?: ProviderMap;
  bindings: Binding[] = [];
}
