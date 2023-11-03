import { Inject } from '@nestjs/common'
import {
  getTwurpleConnectionChatToken,
  getTwurpleConnectionPubsubToken,
  getTwurpleConnectionApiToken,
} from './twurple.utils'

// noinspection JSUnusedGlobalSymbols
export const InjectTwurpleApi = (connection?: string) => {
  return Inject(getTwurpleConnectionApiToken(connection))
}

// noinspection JSUnusedGlobalSymbols
export const InjectTwurpleChat = (connection?: string) => {
  return Inject(getTwurpleConnectionChatToken(connection))
}


// noinspection JSUnusedGlobalSymbols
export const InjectTwurplePubsub = (connection?: string) => {
  return Inject(getTwurpleConnectionPubsubToken(connection))
}
