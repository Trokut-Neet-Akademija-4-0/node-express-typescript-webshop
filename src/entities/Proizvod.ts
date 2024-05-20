/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import ProizvodKupac from './ProizvodKupac'
import Slika from './Slika'
import StringToFloatTransformer from '../utils/stringToFloatTransformer'

@Index('Proizvod_pkey', ['proizvodId'], { unique: true })
@Entity('Proizvod', { schema: 'public' })
export default class Proizvod extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'proizvod_id' })
  proizvodId!: number

  @Column('character varying', {
    name: 'ime_proizvoda',
    nullable: true,
    length: 255,
  })
  imeProizvoda!: string | null

  @Column('character varying', {
    name: 'proizvodjac',
    nullable: true,
    length: 255,
  })
  proizvodjac!: string | null

  @Column('character varying', { name: 'opis', nullable: true, length: 2048 })
  opis!: string | null

  @Column('numeric', {
    name: 'cijena',
    precision: 10,
    scale: 2,
    transformer: new StringToFloatTransformer(),
  })
  cijena!: number

  @Column('integer', { name: 'kolicina', nullable: true })
  kolicina!: number | null

  @Column('timestamp with time zone', {
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt!: Date | null

  @OneToMany(
    () => ProizvodKupac,
    (proizvodKupac: ProizvodKupac) => proizvodKupac.proizvod,
  )
  proizvodKupacs!: ProizvodKupac[]

  @OneToMany(() => Slika, (slika: Slika) => slika.proizvod)
  slikas!: Slika[]

  updateQuantityAndPrice(quantity: number, price: number) {
    this.cijena = price
    this.kolicina = quantity
  }

  updateExistingProduct(updatedData: Proizvod) {
    this.cijena = updatedData.cijena
    this.kolicina = updatedData.kolicina
    this.imeProizvoda = updatedData.imeProizvoda
    this.opis = updatedData.opis
    this.proizvodjac = updatedData.proizvodjac
    this.deletedAt = updatedData.deletedAt ?? null
  }
}
