import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

@Entity('addresses')
class Address {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ length: 120 })
  district: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column()
  number: string;

  @Column({ length: 60 })
  city: string;

  @Column({ length: 2 })
  state: string;
};

export { Address };