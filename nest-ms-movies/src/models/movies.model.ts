import { Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";

@Entity()
export class movies{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    time: string;

    @Column()
    image: string;

    @Column()
    status: boolean;

}