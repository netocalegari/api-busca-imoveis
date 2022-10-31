import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Property } from "./properties.entity";
import { User } from "./user.entity";

@Entity('schedules_users_properties')
class Schedule {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({type: 'date'})
  date: string;

  @Column({type: 'time'})
  hour: string;

  @ManyToOne(() => User, user => user.schedules, {eager: true})
  user: User;

  @ManyToOne(() => Property, {eager: true})
  property: Property;
};

export { Schedule };