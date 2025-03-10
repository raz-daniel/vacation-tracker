import { AllowNull, Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Item from "./item";


@Table({
    underscored: true
})

export default class Category extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string
    
    @AllowNull(false)
    @Column(DataType.STRING(40))
    name: string

    @HasMany(() => Item)
    items: Item[]
}