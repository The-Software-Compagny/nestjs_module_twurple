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
yarn add @streamkits/nestjs_module_factorydrive
```
## Instanciate
```ts
// app.module.ts
import { FactorydriveModule, FactorydriveService } from '@streamkits/nestjs_module_factorydrive'

@Module({
  imports: [
    // ...
    FactorydriveModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        ...config.get('factorydrive.options'),
      }),
    }),
    // ...
  ],
})
export class AppModule {
  public constructor(storage: FactorydriveService) {
    // If you want to add a new driver you can use the registerDriver method
    storage.registerDriver('s3', AwsS3Storage)
  }
}

//config.ts
export default {
  // ...
  factorydrive: {
    options: {
      default: 'local',
      disks: {
        local: {
          driver: 'local',
          config: {
            root: process.cwd() + '/storage',
          },
        },
        s3: {
          driver: 's3',
          config: {
            credentials: {
              accessKeyId: '******',
              secretAccessKey: '******',
            },
            endpoint: 'http://minio:9000/',
            region: 'us-east-1',
            bucket: 'example',
            forcePathStyle: true,
          },
        },
      },
    },
  },
  // ...
}
```
## Usage
```ts
// filestorage.service.ts
import { FactorydriveService } from '@streamkits/nestjs_module_factorydrive'

@Injectable()
export class FileStorageService {
  public constructor(
    @InjectFactorydrive() private readonly factorydrive: FactorydriveService,
  ) {}

  public async uploadFile(path: string, file: Express.Multer.File): Promise<string> {
    const res = await this.factorydrive.getDisk('s3').put(path, file.buffer)
    return res.raw
  }

  public async deleteFile(path: string): Promise<void> {
    await this.factorydrive.getDisk('s3').delete(path)
  }

  public async moveFile(path: string, target: string): Promise<void> {
    await this.factorydrive.getDisk('s3').delete(path, target)
  }

  public async copyFile(path: string, target: string): Promise<void> {
    await this.factorydrive.getDisk('s3').copy(path, target)
  }

  public async listFiles(path: string): Promise<void> {
    await this.factorydrive.getDisk('s3').flatList(path)
  }
}
```
