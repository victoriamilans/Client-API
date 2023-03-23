import { getRounds, hashSync } from "bcryptjs";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { boolean } from "zod";
import Contact from "./contact.entity";

@Entity("clients")
class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  fullName: string;

  @Column({ unique: true, type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar" })
  phone: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Contact, (contacts: Contact) => contacts.client, {
    eager: true,
  })
  contacts: Contact[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const encryptHash = getRounds(this.password);
    if (!encryptHash) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export default Client;
