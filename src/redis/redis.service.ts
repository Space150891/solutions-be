import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

import { REDIS_CLIENT } from './redis.constants';

@Injectable()
export class RedisAuthService {
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {}

  async setRefreshToken(
    key: string,
    value: string,
    ttl: number,
  ): Promise<void> {
    await this.redisClient.set(key, value, 'EX', ttl);
  }

  async getRefreshToken(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async deleteRefreshToken(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
