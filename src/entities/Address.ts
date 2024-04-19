import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("Address_pkey", ["id"], { unique: true })
@Entity("Address", { schema: "public" })
export class Address {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "country", nullable: true })
  country: string | null;

  @Column("character varying", { name: "city", nullable: true })
  city: string | null;

  @Column("character varying", { name: "street", nullable: true })
  street: string | null;

  @Column("character varying", { name: "number", nullable: true })
  number: string | null;

  @OneToMany(() => Users, (users) => users.address)
  users: Users[];
}
