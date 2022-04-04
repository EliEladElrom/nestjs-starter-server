/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
*/

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { pinoConfig } from 'src/utils/logging';
import { ApplicationsModule } from '../applications/applications.module';

import { HealthCheckModule } from '../healthCheck/healthCheck.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({ pinoHttp: pinoConfig }),
    HealthCheckModule,
    ApplicationsModule,
  ],
})
export class AppModule {}
