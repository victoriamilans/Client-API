import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Client from "./client.entity";

@Entity("contacts")
class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  fullName: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
  phone: string;

  @Column({ type: "boolean", default: false })
  isDefault: boolean;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Client, (client: Client) => client.contacts)
  client: Client;
}

export default Contact;
