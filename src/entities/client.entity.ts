import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Contact from "./contact.entity";

@Entity("clients")
class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  fullName: string;

  @Column({ unique: true, type: "varchar" })
  email: string;

  @Column({ type: "decimal" })
  telephone: number;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Contact, (contact: Contact) => contact.client, {
    eager: true,
  })
  contact: Contact[];
}

export default Client;
