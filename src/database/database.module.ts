import { Module } from '@nestjs/common';
import { typeormProvider } from './typeorm.provider';
import { DATA_SOURCE_INJECTION_TOKEN } from './data-source.injection-token';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  providers: [typeormProvider],
  exports: [DATA_SOURCE_INJECTION_TOKEN],
})
export class DatabaseModule {}
