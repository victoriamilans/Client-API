import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Client from "./client.entity";

@Entity("contacts")
class Contact {
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

  @ManyToOne(() => Client, (client: Client) => client.contact)
  client: Client;
}

export default Contact;
