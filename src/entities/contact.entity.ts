import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Client from "./client.entity";

@Entity("contacts")
class Contact {
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

  @ManyToOne(() => Client, (client: Client) => client.contact)
  client: Client;
}

export default Contact;
