import { Entity } from 'typeorm';

import { BaseEntity } from './baseEntity';

@Entity('agendas')
export class AgendasEntity extends BaseEntity {
  time: string;
  task: string;
  doctor: string;
  patient: string;
  outcome: string;
}
