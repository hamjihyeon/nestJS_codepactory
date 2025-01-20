import { UsersModel } from "src/users/entities/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostsModel {
    // 식별될 수 있는 유일한 값
    @PrimaryGeneratedColumn()
    id: number;

    // 1. UsersModel과 연동한다 Foreign Key를 이용해서
    // 2. null이 될 수 없다
    @ManyToOne(()=>UsersModel, (user)=>user.posts, {
        nullable: false,
    }) 
    author: UsersModel;
    
    @Column()
    title: string;
    
    @Column()
    content: string;
    
    @Column()
    likeCount: number;

    @Column()
    commentCount: number;
}