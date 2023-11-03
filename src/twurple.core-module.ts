import { DynamicModule, Global, Module, Provider } from '@nestjs/common'
import { TwurpleModuleAsyncOptions, TwurpleModuleOptions, TwurpleModuleOptionsFactory } from './twurple.interfaces'
import {
  createTwurpleChatConnection,
  createTwurpleApiConnection,
  createTwurplePubsubConnection,
  getTwurpleConnectionChatToken,
  getTwurpleConnectionPubsubToken,
  getTwurpleConnectionApiToken,
  getTwurpleOptionsToken,
} from './twurple.utils'

@Global()
@Module({})
export class TwurpleCoreModule {
  public static forRoot(options: TwurpleModuleOptions, connection?: string): DynamicModule {
    const twurpleOptionsProvider: Provider = {
      provide: getTwurpleOptionsToken(connection),
      useValue: options,
    }
    const twurpleConnectionApiProvider: Provider = {
      provide: getTwurpleConnectionApiToken(connection),
      useValue: createTwurpleApiConnection(options),
    }
    const twurpleConnectionChatProvider: Provider = {
      provide: getTwurpleConnectionChatToken(connection),
      useValue: createTwurpleChatConnection(options),
    }
    const twurpleConnectionPubsubProvider: Provider = {
      provide: getTwurpleConnectionPubsubToken(connection),
      useValue: createTwurplePubsubConnection(options),
    }

    return {
      module: TwurpleCoreModule,
      providers: [
        twurpleOptionsProvider,
        twurpleConnectionApiProvider,
        twurpleConnectionChatProvider,
        twurpleConnectionPubsubProvider,
      ],
      exports: [
        twurpleOptionsProvider,
        twurpleConnectionApiProvider,
        twurpleConnectionChatProvider,
        twurpleConnectionPubsubProvider,
      ],
    }
  }

  public static forRootAsync(options: TwurpleModuleAsyncOptions, connection: string): DynamicModule {
    const twurpleConnectionApiProvider: Provider = {
      provide: getTwurpleConnectionApiToken(connection),
      useFactory(options: TwurpleModuleOptions) {
        return createTwurpleApiConnection(options)
      },
      inject: [getTwurpleOptionsToken(connection)],
    }
    const twurpleConnectionChatProvider: Provider = {
      provide: getTwurpleConnectionChatToken(connection),
      useFactory(options: TwurpleModuleOptions) {
        return createTwurpleChatConnection(options)
      },
      inject: [getTwurpleOptionsToken(connection)],
    }
    const twurpleConnectionPubsubProvider: Provider = {
      provide: getTwurpleConnectionPubsubToken(connection),
      useFactory(options: TwurpleModuleOptions) {
        return createTwurplePubsubConnection(options)
      },
      inject: [getTwurpleOptionsToken(connection)],
    }

    return {
      module: TwurpleCoreModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options, connection), twurpleConnectionApiProvider, twurpleConnectionChatProvider, twurpleConnectionPubsubProvider],
      exports: [twurpleConnectionApiProvider, twurpleConnectionChatProvider, twurpleConnectionPubsubProvider],
    }
  }

  public static createAsyncProviders(options: TwurpleModuleAsyncOptions, connection?: string): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting')
    }

    if (options.useExisting || options.useFactory) {
      return [
        this.createAsyncOptionsProvider(options, connection),
      ]
    }

    return [
      this.createAsyncOptionsProvider(options, connection),
      { provide: options.useClass, useClass: options.useClass },
    ]
  }

  public static createAsyncOptionsProvider(options: TwurpleModuleAsyncOptions, connection?: string): Provider {

    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting')
    }

    if (options.useFactory) {
      return {
        provide: getTwurpleOptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    }

    return {
      provide: getTwurpleOptionsToken(connection),
      async useFactory(optionsFactory: TwurpleModuleOptionsFactory): Promise<TwurpleModuleOptions> {
        // noinspection ES6RedundantAwait
        return await optionsFactory.createTwurpleModuleOptions()
      },
      inject: [options.useClass || options.useExisting],
    }
  }
}
