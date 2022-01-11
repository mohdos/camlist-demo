import { BaseEntity, Column, CreateDateColumn, Entity, Exclusion, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PetCategory } from "./PetCategory";
import { User } from "./User";
import { Bid } from "./Bid";

export enum PetStatus {
    available = 'available',
    unavailable = 'unavailable'
}

/**
 * Entity that holds the pets information
 */

@Entity()
export class Pet extends BaseEntity {

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({unique: true})
    name: string;

    @Column({type: 'enum', enum: PetStatus, default: PetStatus.available})
    status: PetStatus;

    @CreateDateColumn({name: 'created_at', type: "timestamp with time zone"})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at', type: "timestamp with time zone"})
    updatedAt: string;

    @ManyToOne(type=>PetCategory, category => category.pets)
    @JoinColumn({name: 'category_id'})
    category: PetCategory;
    
    @ManyToOne(type=>User, user => user.pets)
    @JoinColumn({name: 'owner_id'})
    owner: User;

    @OneToMany(type=>Bid, bid => bid.bidder)
    bids: Bid[];

}
