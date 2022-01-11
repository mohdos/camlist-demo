

import { BaseEntity, Column, CreateDateColumn, Entity, Exclusion, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Pet } from "./Pet";
import { PetCategory } from "./PetCategory";
import { User } from "./User";

export enum PetStatus {
    available = 'available',
    unavailable = 'unavailable'
}

/**
 * Entity that holds the bids information
 */

@Entity()
@Unique('bidder_pet_unique', ['bidder', 'pet'])
export class Bid extends BaseEntity {

    @Column({nullable: false})
    bid: number;

    @CreateDateColumn({name: 'created_at', type: "timestamp with time zone"})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at', type: "timestamp with time zone"})
    updatedAt: string;

    @ManyToOne(type=>User, user => user.bids, {primary: true})
    @JoinColumn({name: 'bidder_id'})
    bidder: User;
    
    @ManyToOne(type=>Pet, pet => pet.bids, {primary: true})
    @JoinColumn({name: 'pet_id'})
    pet: Pet;
    
}


