import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Contact from "./contact.entity";

@Entity("clients")
class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  fullName: string;

  @Column({ unique: true, type: "varchar" })
  email: string;

  @Column({ type: "integer" })
  telephone: number;

  @Column({ type: "date" })
  registrationDate: Date;

  @OneToMany(() => Contact, (contact: Contact) => contact.client)
  contact: Contact[];
}

export default Client;
