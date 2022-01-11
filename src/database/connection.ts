import "reflect-metadata";
import { createConnection } from "typeorm";
import { vars } from "../config";
import path from "path";
import {User} from './entities/User'
import { Bid } from "./entities/Bid";
import { Pet } from "./entities/Pet";
import { PetCategory } from "./entities/PetCategory";
import { seedDB } from "./seeds";

export const connectToDB = async () => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: vars.postgres.host,
      port: vars.postgres.port,
      username: vars.postgres.username,
      password: vars.postgres.password,
      database: vars.postgres.db,
      entities: [User, Bid, Pet, PetCategory],
      synchronize: true,
      // logging: true
    });
    await seedDB(connection);
    console.log("Connected successfully");
    return connection;
  } catch (e: any) {
    console.log(e);
  }
};
