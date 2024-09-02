import { DecryptCommand, EncryptCommand, KMSClient } from '@aws-sdk/client-kms';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KmsService {
  private kmsClient: KMSClient;

  constructor() {
    this.kmsClient = new KMSClient({
      region: process.env.AWS_REGION,
    });
  }

  async encrypt(data: string): Promise<string> {
    const command = new EncryptCommand({
      KeyId: process.env.AWS_KMS_KEY_ID,
      Plaintext: Buffer.from(data),
    });

    const result = await this.kmsClient.send(command);
    return Buffer.from(result.CiphertextBlob).toString('base64');
  }

  async decrypt(data: string): Promise<string> {
    const command = new DecryptCommand({
      CiphertextBlob: Buffer.from(data, 'base64'),
    });

    const result = await this.kmsClient.send(command);
    return Buffer.from(result.Plaintext).toString('utf-8');
  }
}
