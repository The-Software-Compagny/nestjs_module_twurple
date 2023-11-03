<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  Twurple module for NestJS framework
</p>

<p align="center">
  <a href="https://www.npmjs.com/org/streamkits"><img src="https://img.shields.io/npm/v/@streamkits/nestjs_module_twurple.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/org/streamkits"><img src="https://img.shields.io/npm/l/@streamkits/nestjs_module_twurple.svg" alt="Package License" /></a>
  <a href="https://github.com/StreamKITS/nestjs_module_rcon/actions/workflows/ci.yml"><img src="https://github.com/StreamKITS/nestjs_module_rcon/actions/workflows/ci.yml/badge.svg" alt="Publish Package to npmjs" /></a>
</p>
<br>

# Twurple Module
Twurple for NestJS Framework

## Install dependencies
```bash
yarn add @streamkits/nestjs_module_twurple
```
## Instanciate
```ts
// app.module.ts
import { TwurpleModule, TwurpleOptions } from '@streamkits/nestjs_module_twurple'

TwurpleModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    config: config.get<TwurpleOptions>('twurple.options'),
  }),
})
```
