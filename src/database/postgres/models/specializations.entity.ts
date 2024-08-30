import { Column, Entity, OneToMany, Unique } from 'typeorm';

import { BaseEntity } from './baseEntity';
import { DoctorsEntity } from './doctors.entity';

@Entity('specializations')
@Unique(['specialization'])
export class SpecializationsEntity extends BaseEntity {
  @Column() specialization: string;
  @OneToMany(() => DoctorsEntity, (doctor) => doctor.specialization)
  doctors: DoctorsEntity[];
}
