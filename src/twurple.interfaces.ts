/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthProvider } from '@twurple/auth'
import { ModuleMetadata, Type } from '@nestjs/common'

export interface TwurpleModuleOptions {
  config: TwurpleOptions
  features?: {
    api?: boolean
    chat?: boolean
    pubsub?: boolean
  }
}

export interface TwurpleModuleFeatureOptions {
  [key: string]: any
}

export interface TwurpleOptions {
  authProvider: AuthProvider
  features?: {
    api?: TwurpleModuleFeatureOptions
    chat?: TwurpleModuleFeatureOptions
    pubsub?: TwurpleModuleFeatureOptions
  }
}

export interface TwurpleModuleOptionsFactory {
  createTwurpleModuleOptions(): Promise<TwurpleModuleOptions> | TwurpleModuleOptions
}

export interface TwurpleModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[]
  useClass?: Type<TwurpleModuleOptionsFactory>
  useExisting?: Type<TwurpleModuleOptionsFactory>
  useFactory?: (...args: any[]) => Promise<TwurpleModuleOptions> | TwurpleModuleOptions
}
