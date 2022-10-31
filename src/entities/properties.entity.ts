import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Address } from "./addresses.entity";
import { Category } from "./category.entity";
import { Schedule } from "./schedules.entity";

@Entity('properties')
class Property {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ default: false })
  sold: boolean;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  value: number;

  @Column()
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Address, {onDelete: 'CASCADE', eager: true}) 
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Category)//, {eager: true})
  category: Category;

  @OneToMany(() => Schedule, schedule => schedule.property)
  schedules: Schedule[];
};

export { Property };