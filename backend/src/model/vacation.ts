import { AllowNull, BelongsToMany, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import Follower from "./follower";
import User from "./user";


@Table({
    underscored: true
})

export default class Vacation extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING(60))
    destination: string

    @AllowNull(false)
    @Column(DataType.TEXT)
    description: string

    @AllowNull(false)
    @Column(DataType.DATE)
    beginDate: Date

    @AllowNull(false)
    @Column(DataType.DATE)
    endDate: Date

    @AllowNull(false)
    @Column(DataType.DECIMAL(10,2))
    price: number

    @AllowNull(true)
    @Column(DataType.TEXT)
    imageUrl: string

    @BelongsToMany(() => User, () => Follower)
    followers: User[]

}