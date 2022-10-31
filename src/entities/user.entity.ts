import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Exclude } from 'class-transformer';
import { Schedule } from "./schedules.entity";

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  
  @Column({ length: 60 })
  name: string;

  @Column({ length: 60, unique: true})
  email: string;

  @Column()
  isAdm: boolean;

  @Column({ default: true})
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ length: 120})
  @Exclude()
  password: string;

  @OneToMany(() => Schedule, schedule => schedule.user)
  schedules: Schedule[];
};

export { User };