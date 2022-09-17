import {
  Application,
  injectable,
  Component,
  config,
  ContextTags,
  CoreBindings,
  inject,
} from '@loopback/core';
import {KratosComponentBindings} from './keys'
import {DEFAULT_KRATOS_OPTIONS, KratosComponentOptions} from './types';

// Configure the binding for KratosComponent
@injectable({tags: {[ContextTags.KEY]: KratosComponentBindings.COMPONENT}})
export class KratosComponent implements Component {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    private application: Application,
    @config()
    private options: KratosComponentOptions = DEFAULT_KRATOS_OPTIONS,
  ) {}
}
