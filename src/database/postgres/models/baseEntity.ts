import * as crypto from 'crypto';
import {
  CreateDateColumn,
  Equal,
  FindOperator,
  In,
  Not,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
} from 'typeorm';

import * as dotenv from 'dotenv';
dotenv.config();

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}

export interface EncryptionOptions {
  algorithm: string;
  key: Buffer;
  iv: Buffer;
}

export function encryptData(
  data: string,
  { algorithm, key, iv }: EncryptionOptions,
): string {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function decryptData(
  data: string,
  { algorithm, key, iv }: EncryptionOptions,
): string {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export class EncryptionTransformer implements ValueTransformer {
  constructor(private readonly options: EncryptionOptions) {}
  public from(value?: string | null): string | undefined {
    if (!value) return;
    return decryptData(value, this.options);
  }

  public to(
    value?: string | FindOperator<any> | null,
  ): string | FindOperator<any> | undefined {
    if ((value ?? null) === null) return;
    if (typeof value === 'string') return encryptData(value, this.options);
    if (!value) return;
    if (value.type === `in`) {
      return In(
        (value.value as string[]).map((s) => encryptData(s, this.options)),
      );
    } else if (value.type === 'equal')
      return Equal(encryptData(value.value as string, this.options));
    else if (value.type === 'not')
      return Not(this.to(value.child ?? value.value));
    else if (value.type === 'isNull') return value;
    else
      throw new Error(
        'Only "Equal","In", "Not", and "IsNull" are supported for FindOperator',
      );
  }
}

export class JSONEncryptionTransformer implements ValueTransformer {
  constructor(private readonly options: EncryptionOptions) {}
  public from(value?: null | any): any | undefined {
    if (!value || !value.encrypted) return;
    const decrypted = decryptData(value.encrypted, this.options);
    return JSON.parse(decrypted);
  }

  public to(
    value?: any | FindOperator<any> | null,
  ): object | FindOperator<any> | undefined {
    if ((value ?? null) === null) return;
    if (typeof value === 'object' && !value?.type) {
      const encrypted = encryptData(JSON.stringify(value), this.options);
      return { encrypted };
    }
    if (!value) return;
    // FindOperators are not supported.
    throw new Error(
      'Filter operators are not supported for JSON encrypted fields',
    );
  }
}

export const TextTF = new EncryptionTransformer({
  algorithm: 'aes-256-cbc',
  key: Buffer.from(process.env.ENCRYPTION_KEY as string, 'hex'),
  iv: Buffer.from(process.env.ENCRYPTION_IV as string, 'hex'),
});
export const JSONTF = new JSONEncryptionTransformer({
  algorithm: 'aes-256-cbc',
  key: Buffer.from(process.env.ENCRYPTION_KEY as string, 'hex'),
  iv: Buffer.from(process.env.ENCRYPTION_IV as string, 'hex'),
});
