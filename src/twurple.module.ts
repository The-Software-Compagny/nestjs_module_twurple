import { DynamicModule, Module } from '@nestjs/common'
import { TwurpleModuleAsyncOptions, TwurpleModuleOptions } from './twurple.interfaces'
import { TwurpleCoreModule } from './twurple.core-module'

@Module({})
export class TwurpleModule {
  // noinspection JSUnusedGlobalSymbols
  public static forRoot(options: TwurpleModuleOptions, connection?: string): DynamicModule {
    return {
      module: TwurpleModule,
      imports: [TwurpleCoreModule.forRoot(options, connection)],
      exports: [TwurpleCoreModule],
    }
  }

  // noinspection JSUnusedGlobalSymbols
  public static forRootAsync(options: TwurpleModuleAsyncOptions, connection?: string): DynamicModule {
    return {
      module: TwurpleModule,
      imports: [TwurpleCoreModule.forRootAsync(options, connection)],
      exports: [TwurpleCoreModule],
    }
  }
}
