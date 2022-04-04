import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        console.log(
          `MongoDB connection string: ${configService.get('DB_HOST')}`,
        );

        return {
          uri: `mongodb://${configService.get('DB_HOST')}:${configService.get(
            'DB_PORT',
          )}`,
          user: configService.get('DB_USER'),
          pass: configService.get('DB_PASS'),
          dbName: configService.get('DB_NAME'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
