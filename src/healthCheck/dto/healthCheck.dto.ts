/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
*/

import { IsBoolean } from 'class-validator';

export class HealthCheckDto {
  @IsBoolean()
  readonly healthy: boolean;
}
