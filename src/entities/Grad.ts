/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Adresa from './Adresa'

@Index('Grad_pkey', ['gradId'], { unique: true })
@Entity('Grad', { schema: 'public' })
export default class Grad extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'grad_id' })
  gradId!: number

  @Column('character varying', {
    name: 'postanski_broj',
    nullable: true,
    length: 128,
  })
  postanskiBroj!: string | null

  @Column('character varying', { name: 'grad', nullable: true, length: 255 })
  grad!: string | null

  @Column('character varying', { name: 'drzava', nullable: true, length: 255 })
  drzava!: string | null

  @OneToMany(() => Adresa, (adresa: Adresa) => adresa.grad)
  adresas!: Adresa[]
}
