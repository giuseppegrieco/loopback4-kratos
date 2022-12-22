import {BindingKey} from '@loopback/core';
import {KratosComponent} from './component';
import {KratosComponentOptions} from './types';

/**
 * Binding keys used by this component.
 */
export namespace KratosComponentBindings {
  export const COMPONENT = BindingKey.create<KratosComponent>(
    'kratos.component',
  );

  export const CONFIG = BindingKey.create<KratosComponentOptions | null>(
    'kratos.config',
  );

  export const PROXY = BindingKey.create<KratosComponentOptions | null>(
    'kratos.proxy',
  );

  export const USER_SERVICE = BindingKey.create<KratosComponentOptions | null>(
    'kratos.user_service',
  );
}
