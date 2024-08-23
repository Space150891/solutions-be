import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './baseEntity';
import { DoctorsEntity } from './doctors.entity';

@Entity('specializations')
export class SpecializationsEntity extends BaseEntity {
  @Column() specialization: string;
  @OneToMany(() => DoctorsEntity, (doctor) => doctor.specialization)
  doctors: DoctorsEntity[];
}
