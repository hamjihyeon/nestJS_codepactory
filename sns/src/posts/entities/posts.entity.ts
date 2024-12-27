import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostsModel {
    // 식별될 수 있는 유일한 값
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author: string;
    
    @Column()
    title: string;
    
    @Column()
    content: string;
    
    @Column()
    likeCount: number;

    @Column()
    commentCount: number;
}