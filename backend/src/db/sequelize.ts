import { Sequelize } from "sequelize-typescript";
import config from "config";
import User from "../model/user";
import Follower from "../model/follower";
import Vacation from "../model/vacation";


const logging = config.get<boolean>('sequelize.logging') ? console.log : false


const sequelize = new Sequelize({
    models: [ User, Follower, Vacation],
    dialect: 'mysql',
    ...config.get('db'),
    logging
})

export default sequelize;