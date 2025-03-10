import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Category from "./category";



@Table({
    underscored: true
})

export default class Item extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    isRecycled: boolean

    @AllowNull(false)
    @Column
    name: string

    @ForeignKey(() => Category)
    @Column(DataType.UUID)
    categoryId: string

    @AllowNull(false)
    @Column(DataType.DATE)
    date: Date

    @AllowNull(false)
    @Column(DataType.DECIMAL(10,2))
    price: number

    @AllowNull(false)
    @Column(DataType.INTEGER)
    discount: number
    
    @BelongsTo(() => Category)
    category: Category

}