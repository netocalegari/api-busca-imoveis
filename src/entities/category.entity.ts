import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Property } from "./properties.entity";

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ length: 120, unique: true})
  name: string;

  @OneToMany(() => Property, property => property.category, {eager: true})
  properties: Property[];
}

export { Category };