/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
*/

import { Controller } from '@nestjs/common';
import { ApplicationsService } from './applications.service';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}
}
