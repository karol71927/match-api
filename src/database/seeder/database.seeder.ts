import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseEnvironmentVariables } from '../config/database.environment-variables';
import { DataSource } from 'typeorm';
import { DATA_SOURCE_INJECTION_TOKEN } from '../data-source.injection-token';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class DatabaseSeeder implements OnApplicationBootstrap {
  constructor(
    private readonly configService: ConfigService<DatabaseEnvironmentVariables>,
    @Inject(DATA_SOURCE_INJECTION_TOKEN)
    private readonly dataSource: DataSource,
  ) {}

  async onApplicationBootstrap() {
    if (!this.configService.get<boolean>('SEED_DATABASE')) {
      return;
    }

    const res: any[] = await this.dataSource.query('SELECT * from teams');

    if (res.length > 0) {
      return;
    }

    const file = readFileSync(join(__dirname, '../../../scripts/out.sql'));

    for (const query of file.toString().split(';')) {
      try {
        await this.dataSource.query(query);
      } catch (e) {
        console.log(e);
      }
    }
  }
}
