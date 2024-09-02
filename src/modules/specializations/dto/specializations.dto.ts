import {
  DoctorsEntity,
  SpecializationsEntity,
} from '@/database/postgres/models';
import { BasicRO, DeletedRO, UpdatedRO } from '@/utils';
import { ApiHideProperty } from '@nestjs/swagger';

export class SpecializationDTO implements SpecializationsEntity {
  @ApiHideProperty() doctors: DoctorsEntity[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
  specialization: string;
}

export class SpecializationCreateDTO implements Partial<SpecializationsEntity> {
  specialization: string;
}

export class SpecializationUpdateDTO implements Partial<SpecializationsEntity> {
  specialization: string;
}

export class GetSpecializationsRO extends BasicRO {
  data: SpecializationDTO[];
}

export class GetSpecializationRO extends BasicRO {
  data: SpecializationDTO;
}

export class CreateSpecializationRO extends BasicRO {
  data: SpecializationDTO;
}

export class UpdateSpecializationRO extends UpdatedRO {
  data: SpecializationDTO;
}

export class DeleteSpecializationRO extends DeletedRO {}
