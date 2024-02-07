import {
  TWURPLE_MODULE_CONNECTION, 
  TWURPLE_MODULE_CONNECTION_CHAT_TOKEN,
  TWURPLE_MODULE_CONNECTION_PUBSUB_TOKEN,
  TWURPLE_MODULE_CONNECTION_API_TOKEN,
  TWURPLE_MODULE_OPTIONS_TOKEN,
} from './twurple.constants'
import { TwurpleModuleOptions } from './twurple.interfaces'
import { Logger } from '@nestjs/common'

export function getTwurpleOptionsToken(connection: string): string {
  return `${connection || TWURPLE_MODULE_CONNECTION}_${TWURPLE_MODULE_OPTIONS_TOKEN}`
}

export function getTwurpleConnectionApiToken(connection: string): string {
  return `${connection || TWURPLE_MODULE_CONNECTION}_${TWURPLE_MODULE_CONNECTION_API_TOKEN}`
}

export function getTwurpleConnectionChatToken(connection: string): string {
  return `${connection || TWURPLE_MODULE_CONNECTION}_${TWURPLE_MODULE_CONNECTION_CHAT_TOKEN}`
}

export function getTwurpleConnectionPubsubToken(connection: string): string {
  return `${connection || TWURPLE_MODULE_CONNECTION}_${TWURPLE_MODULE_CONNECTION_PUBSUB_TOKEN}`
}

export async function createTwurpleApiConnection(options: TwurpleModuleOptions) {
  const { config } = options
  Logger.verbose('createTwurpleApiConnection', 'TwurpleModule')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { ApiClient } = await import('@twurple/api')
  return new ApiClient({ authProvider: config?.authProvider, ...config?.features?.api })
}

export async function createTwurpleChatConnection(options: TwurpleModuleOptions) {
  const { config } = options
  Logger.verbose('createTwurpleChatConnection', 'TwurpleModule')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { ChatClient } = await import('@twurple/chat')
  return new ChatClient({ authProvider: config?.authProvider, ...config?.features?.chat })
}


export async function createTwurplePubsubConnection(options: TwurpleModuleOptions) {
  const { config } = options
  Logger.verbose('createTwurplePubsubConnection', 'TwurpleModule')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { PubSubClient } = await import('@twurple/pubsub')
  return new PubSubClient({ authProvider: config?.authProvider, ...config?.features?.pubsub })
}
