import { Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import * as crypto from 'crypto';

interface PasswordHash {
  hash: string;
  salt: string;
}

export type PasswordDigest = 'sha512';

export class Password {
  @IsString()
  @Type(() => String)
  @Expose()
  readonly hash!: string;

  @IsString()
  @Type(() => String)
  @Expose()
  readonly salt!: string;

  @IsString()
  @Type(() => String)
  @Expose()
  readonly digest!: PasswordDigest;
}

export const randomString = (size = 32) =>
  crypto.randomBytes(size).toString('hex');

export const passwordHash = (
  password: string,
  digest: PasswordDigest = 'sha512',
): PasswordHash => {
  const salt = randomString();
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, digest)
    .toString(`hex`);
  return { hash, salt };
};

export const password = (hash: string, digest: PasswordDigest): Password => ({
  ...passwordHash(hash, 'sha512'),
  digest,
});

export const passwordCompare = (
  password: string,
  hash: string,
  salt: string,
  digest: PasswordDigest = 'sha512',
): boolean => {
  return (
    crypto.pbkdf2Sync(password, salt, 1000, 64, digest).toString(`hex`) === hash
  );
};
