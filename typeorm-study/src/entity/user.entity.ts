import { Column, CreateDateColumn, Entity, Generated, JoinColumn,  OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { ProfileModel } from "./profile.entity";
import { PostModel } from "./post.entity";

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
}
@Entity()
export class UserModel {
    // 자동으로 ID 생성
    // @PrimaryGeneratedColumn()
    // 모든 테이블에서 기본적으로 존재해야한다.

    // @PrimaryColumn() 
    // 테이블 안에서 각각의 Row를 구분할 수 있는 칼럼이다.

    // @PrimaryGeneratedColumn() -> 순서대로 위로 올라간다
    // @PrimaryGeneratedColumn('uuid')  -> 랜덤으로 생성된다.
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    // @Column({
    //     // 데이터베이스에서 인지하는 칼럼 타입
    //     // 자동으로 유추됨
    //     type: 'varchar',
    //     // 데이터베이스 칼럼 이름
    //     // 프로퍼티 이름으로 자동 유추됨
    //     name: 'title',
    //     // 값의 길이
    //     // 입력할 수 있는 글자의 길이
    //     length: 300,
    //     // null이 가능한지
    //     nullable: true,
    //     // true면 처음 저장할 때만 값 지정 가능
    //     // 이후에는 값 변경 불가능
    //     update: true,
    //     // find() 실행할 때 자동으로 값을 불러올지
    //     // 기본값이 true
    //     select: false,
    //     // 기본값
    //     // 아무것도 입력하지 않았을 때 기본적으로 들어가는 값
    //     default: 'default value',
    //     // 칼럼중에서 유일무이한 값인지
    //     unique: false,
    // })
    // title: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: string;

    // 데이터가 생성되는 날짜와 시간이 자동으로 찍힌다.
    @CreateDateColumn()
    createdAt: Date;

    // 데이터가 업데이트 되는 날짜와 시간이 자동으로 찍힌다.
    @UpdateDateColumn()
    updatedAt: Date;

    // 데이터가 업데이트 될 때마다 1씩 올라간다.
    // 처음 생성되면 값은 1이다.
    // save() 함수가 몇번 불렸는지 기억한다.
    @VersionColumn()
    version: number;

    @Column()
    @Generated('uuid')
    additionalId: string;

    @OneToOne(()=> ProfileModel, (profile) => profile.user)
    @JoinColumn()
    profile: ProfileModel;

    @OneToMany(()=> PostModel, post => post.author)
    posts: PostModel[];
 }