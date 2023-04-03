import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { setting } from '../environment/env.setting';
import { join } from 'path';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [setting.KEY],
      useFactory: (configService: ConfigType<typeof setting>): any => {
        const {
          DATABASE_HOST,
          DATABASE_USER,
          DATABASE_PORT,
          DATABASE_NAME,
          DATABASE_PASSWORD,
          DATABASE_TYPE,
          DATABASE_SSL,
        } = configService.database;
        const databaseSetting = {
          type: DATABASE_TYPE,
          host: DATABASE_HOST,
          port: parseInt(DATABASE_PORT),
          database: DATABASE_NAME,
          username: DATABASE_USER,
          password: DATABASE_PASSWORD,
          synchronize: true,
          autoLoadEntities: true,
          entities: [join(__dirname, '../../', '**', '*.entity.{ts,js}')],
          migrations: [join(__dirname, '../../', '**', '*.migration.{ts,js}')],
          migrationsTableName: 'typeorm_migrations',
          migrationsRun: process.env.NODE_ENV === 'dev',
        };
        const isSslConnection = DATABASE_SSL === 'true';
        if (isSslConnection) {
          databaseSetting['ssl'] = {
            rejectUnauthorized: false,
          };
        }
        return databaseSetting;
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
