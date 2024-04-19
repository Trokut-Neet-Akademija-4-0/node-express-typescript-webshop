import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address";

@Index("Users_pkey", ["id"], { unique: true })
@Entity("Users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "firstname", nullable: true })
  firstname: string | null;

  @Column("character varying", { name: "lastname", nullable: true })
  lastname: string | null;

  @Column("character varying", { name: "email", nullable: true })
  email: string | null;

  @ManyToOne(() => Address, (address) => address.users)
  @JoinColumn([{ name: "address_id", referencedColumnName: "id" }])
  address: Address;
}
