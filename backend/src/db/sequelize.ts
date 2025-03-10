import { Sequelize } from "sequelize-typescript";
import config from "config";
import Item from "../model/item";
import Category from "../model/category";


const logging = config.get<boolean>('sequelize.logging') ? console.log : false


const sequelize = new Sequelize({
    models: [ Item, Category],
    dialect: 'mysql',
    ...config.get('db'),
    logging
})

export default sequelize;