// src/data-source.ts
import { DataSource } from 'typeorm';
import { User } from './entities/User'; // Adjust the path as necessary
import { Failure_go } from './entities/Failure/Failure_go';
import { Fg_Go } from './entities/Failure/Associations/Fg_go';
import { Failure_so } from './entities/Failure/Failure_so';
import { Fs_So } from './entities/Failure/Associations/Fs_So';
import { Image_Order } from './entities/image/ImageOrder';
import { Image_Suborder } from './entities/image/Image_Suborder';
import { S_o } from './entities/Setup/Associations/S_o';
import { Setup_Order } from './entities/Setup/SetupOrder';
import { Order } from './entities/Order';
import { Suborder } from './entities/Suborder';
import { TradingBroker } from './entities/tradingBroker/TradingBroker';
import { TradingInstrument } from './entities/tradingInstrument/TradingInstrument';
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    User,
    Failure_go,
    Fg_Go,
    Failure_so,
    Fs_So,
    Image_Order,
    Image_Suborder,
    S_o,
    Setup_Order,
    Order,
    Suborder,
    TradingBroker,
    TradingInstrument,
  ],
  synchronize: false, // Set to true for development only, false for production
});
