/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
*/

import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { HealthCheckResponse } from './entities/healthCheck.entity';

@ApiTags('health-check')
@Controller('health-check')
export class HealthCheckController {
  @Get('/')
  @ApiResponse({ description: 'Health check endpoint', type: HealthCheckResponse, status: 200 })
  async getMyEmployer() {
    return { healthy: true };
  }
}
