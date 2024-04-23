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
import Kosarica from './Kosarica'
import Adresa from './Adresa'
import ProizvodKupac from './ProizvodKupac'

@Index('Kupac_pkey', ['kupacId'], { unique: true })
@Entity('Kupac', { schema: 'public' })
export default class Kupac extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'kupac_id' })
  kupacId!: number

  @Column('character varying', { name: 'email', nullable: true, length: 255 })
  email!: string | null

  @Column('character varying', { name: 'ime', nullable: true, length: 255 })
  ime!: string | null

  @Column('character varying', { name: 'prezime', nullable: true, length: 255 })
  prezime!: string | null

  @Column('character varying', {
    name: 'broj_telefona',
    nullable: true,
    length: 32,
  })
  brojTelefona!: string | null

  @OneToMany(() => Kosarica, (kosarica: Kosarica) => kosarica.kupac)
  kosaricas!: Kosarica[]

  @ManyToOne(() => Adresa, (adresa: Adresa) => adresa.kupacs)
  @JoinColumn([{ name: 'adresa_id', referencedColumnName: 'adresaId' }])
  adresa!: Adresa

  @ManyToOne(() => Kupac, (kupac) => kupac.kupacs)
  @JoinColumn([{ name: 'kupac_dostava_id', referencedColumnName: 'kupacId' }])
  kupacDostava!: Kupac

  @OneToMany(() => Kupac, (kupac) => kupac.kupacDostava)
  kupacs!: Kupac[]

  @OneToMany(
    () => ProizvodKupac,
    (proizvodKupac: ProizvodKupac) => proizvodKupac.kupac,
  )
  proizvodKupacs!: ProizvodKupac[]
}
