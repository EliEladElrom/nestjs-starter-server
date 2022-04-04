/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
*/

import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: 'CACHE_OPTIONS',
      useValue: {
        ttl: 100000,
      },
    },
  ],
  exports: ['CACHE_OPTIONS'],
})
export class CacheConfigModule {}
