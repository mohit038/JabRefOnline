/* eslint-disable @typescript-eslint/no-misused-promises */ // TODO: Remove once redis-mock is updated
/* eslint-disable @typescript-eslint/no-unsafe-assignment */ // TODO: Remove once redis-mock is updated
import {
  createClient,
  RedisClientType,
  RedisDefaultModules,
  RedisFunctions,
  RedisScripts,
} from 'redis'
import { promisify } from 'util'
import { Environment } from '~/config'

export type RedisClient = RedisClientType<
  RedisDefaultModules,
  RedisFunctions,
  RedisScripts
>

export async function createRedisClient(): Promise<RedisClient> {
  const config = useRuntimeConfig()
  if (
    config.public.environment === Environment.LocalDevelopment ||
    config.public.environment === Environment.AzureBuild
  ) {
    const redisMock = (await import('redis-mock')).default
    const mockRedis = redisMock.createClient()
    // Workaround for redis-mock being not compatible with redis@4
    // TODO: Remove this workaround once https://github.com/yeahoffline/redis-mock/issues/195 is fixed
    return {
      get: promisify(mockRedis.get).bind(mockRedis),
      quit: promisify(mockRedis.quit).bind(mockRedis),
      /*
      delete: promisify(mockRedis.del).bind(mockRedis),
      flushAll: promisify(mockRedis.flushAll).bind(mockRedis),
      setEx: promisify(mockRedis.setEx).bind(mockRedis),
      expire: promisify(mockRedis.expire).bind(mockRedis),
      */
    } as unknown as RedisClient
  } else {
    const redisConfig = {
      password: config.redis.password as string | undefined,
      socket: {
        port: config.redis.port,
        host: config.redis.host,
        tls: true as true | undefined,
      },
      // Legacy mode is currently needed for connect-redis
      // see https://github.com/tj/connect-redis/issues/357 and https://github.com/tj/connect-redis/issues/361
      legacyMode: true,
    }

    // Only Azure needs a TLS connection to Redis
    if (config.public.environment !== Environment.Production) {
      delete redisConfig.socket.tls
    }
    // Redis on Github Actions does not need a password
    if (config.public.environment === Environment.CI) {
      delete redisConfig.password
    }
    const client = createClient(redisConfig)
    // Log errors
    // The 'error' handler is important, since otherwise errors in the redis connection bring down the whole server/process
    // see https://github.com/redis/node-redis/issues/2032#issuecomment-1116883257
    client.on('error', (err) => console.error('Redis client:', err))
    client.on('connect', () => console.debug('Redis client: connected'))
    client.on('reconnecting', () => console.debug('Redis client: reconnecting'))
    client.on('ready', () => console.debug('Redis client: ready'))
    try {
      await client.connect()
    } catch (exception) {
      console.error('Error while connection to redis')
      console.error(redisConfig)
      throw exception
    }
    return client
  }
}
