import {BindingKey, CoreBindings} from '@loopback/core';
import {KratosComponent} from './component';

/**
 * Binding keys used by this component.
 */
export namespace KratosComponentBindings {
  export const COMPONENT = BindingKey.create<KratosComponent>(
    `${CoreBindings.COMPONENTS}.KratosComponent`,
  );
}
