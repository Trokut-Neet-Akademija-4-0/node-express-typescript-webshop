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
  Relation,
} from 'typeorm'
import Kupac from './Kupac'
import Racun from './Racun'
import ProizvodKupac from './ProizvodKupac'

@Index('Kosarica_pkey', ['kosaricaId'], { unique: true })
@Entity('Kosarica', { schema: 'public' })
export default class Kosarica extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'kosarica_id' })
  kosaricaId!: number

  @Column('boolean', {
    name: 'is_processed',
    nullable: true,
    default: () => 'false',
  })
  isProcessed!: boolean | null

  @Column('character varying', { name: 'status', nullable: true, length: 255 })
  status!: string | null

  @Column('numeric', { name: 'total', nullable: true, precision: 10, scale: 2 })
  total!: string | null

  @ManyToOne(() => Kupac, (kupac: Kupac) => kupac.kosaricas)
  @JoinColumn([{ name: 'kupac_id', referencedColumnName: 'kupacId' }])
  kupac!: Kupac

  @ManyToOne(() => Racun, (racun: Racun) => racun.kosaricas)
  @JoinColumn([{ name: 'racun_id', referencedColumnName: 'racunId' }])
  racun!: Racun

  @OneToMany(
    () => ProizvodKupac,
    (proizvodKupac: ProizvodKupac) => proizvodKupac.kosarica,
  )
  proizvodKupacs!: Relation<ProizvodKupac[]>

  public get products() {
    return this.proizvodKupacs.map((pk) => {
      const product = pk.proizvod
      product.updateQuantityAndPrice(pk.kolicina, pk.cijena)
      return product
    })
  }
}
