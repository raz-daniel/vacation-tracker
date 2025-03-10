import { AllowNull, BelongsToMany, Column, DataType, Default, Index, Model, PrimaryKey, Table } from "sequelize-typescript";
import Follower from "./follower";
import Vacation from "./vacation";


@Table({
    underscored: true
})

export default class User extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING(40))
    firstName: string

    @AllowNull(false)
    @Column(DataType.STRING(40))
    lastName: string

    @Index({ unique: true })
    @AllowNull(false)
    @Column(DataType.STRING(120))
    email: string

    @AllowNull(false)
    @Column(DataType.STRING(100))
    password: string

    @AllowNull(false)
    @Default('user')
    @Column(DataType.ENUM('admin', 'user'))
    role: string

    @BelongsToMany(() => Vacation, () => Follower)
    vacations: Vacation[]

}