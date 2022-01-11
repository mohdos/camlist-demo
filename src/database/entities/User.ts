import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Pet } from "./Pet";
import { Bid } from "./Bid";

/**
 * Entity that holds the user information
 */
@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({unique: true})
    email: string;

    @Column({select: false, nullable: true})
    password: string;

    @Column({unique: true})
    username: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phone: string;

    @Column()
    status: number;

    @CreateDateColumn({name: 'created_at', type: "timestamp with time zone"})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at', type: "timestamp with time zone"})
    updatedAt: string;

    @OneToMany(type=>Pet, pet => pet.owner)
    pets: Pet[];

    @OneToMany(type=>Bid, bid => bid.bidder)
    bids: Bid[];
}
