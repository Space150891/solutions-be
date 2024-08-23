import { ApiProperty } from '@nestjs/swagger';

export class BasicRO {
  @ApiProperty({
    enum: ['OK', 'ERROR'],
    example: 'OK',
    type: 'string',
  })
  code: string | 'OK' | 'ERROR';
}

export class SortByDTO {
  @ApiProperty({
    description:
      'Sorting criteria where the key is the field name and the value is the sorting order (ASC or DESC)',
    example: { fieldName: 'ASC' },
    type: 'object',
    additionalProperties: {
      type: 'string',
      enum: ['ASC', 'DESC'],
    },
  })
  sortBy: {
    [x: string]: 'ASC' | 'DESC';
  };
}

export class UpdatedRO extends BasicRO {
  @ApiProperty({ type: 'boolean' }) isUpdated: boolean;
}

export class DeletedRO extends BasicRO {
  @ApiProperty({ type: 'boolean' }) isDeleted: boolean;
}
