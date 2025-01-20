import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersModel {
    // 식별될 수 있는 유일한 값
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickname: string;
    
    @Column()
    email: string;
    
    @Column()
    password: string;
    
}