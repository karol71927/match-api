import { Module } from '@nestjs/common';
import { typeormProvider } from './typeorm.provider';
import { DATA_SOURCE_INJECTION_TOKEN } from './data-source.injection-token';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { DatabaseSeeder } from './seeder/database.seeder';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  providers: [typeormProvider, DatabaseSeeder],
  exports: [DATA_SOURCE_INJECTION_TOKEN],
})
export class DatabaseModule {}
