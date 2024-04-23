/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Grad from './Grad'
import Kupac from './Kupac'

@Index('Adresa_pkey', ['adresaId'], { unique: true })
@Entity('Adresa', { schema: 'public' })
export default class Adresa extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'adresa_id' })
  adresaId!: number

  @Column('character varying', { name: 'ulica', nullable: true, length: 255 })
  ulica!: string | null

  @Column('character varying', { name: 'broj', nullable: true, length: 32 })
  broj!: string | null

  @Column('character varying', {
    name: 'napomena_dostavljacu',
    nullable: true,
    length: 255,
  })
  napomenaDostavljacu!: string | null

  @ManyToOne(() => Grad, (grad: Grad) => grad.adresas)
  @JoinColumn([{ name: 'grad_id', referencedColumnName: 'gradId' }])
  grad!: Grad

  @OneToMany(() => Kupac, (kupac: Kupac) => kupac.adresa)
  kupacs!: Kupac[]
}
