import { BaseEntity, Column, CreateDateColumn, Entity, Exclusion, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import jwt from 'jsonwebtoken';
import { vars } from "../../config";
import { Pet } from "./Pet";

/**
 * Entity that holds the pet categories
 */

@Entity()
export class PetCategory extends BaseEntity {

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({unique: true})
    name: string;

    @CreateDateColumn({name: 'created_at', type: "timestamp with time zone"})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at', type: "timestamp with time zone"})
    updatedAt: string;

    @OneToMany(type=>Pet, pet => pet.category)
    pets: Pet[];
}
