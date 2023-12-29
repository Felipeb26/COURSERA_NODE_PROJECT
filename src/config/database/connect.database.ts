import { Collection, MongoClient } from "mongodb";
import { env } from "../env/env";

export async function connect(dbCollection: string): Promise<Collection> {
    const url = `mongodb+srv://batsworks:${encodeURIComponent(env.DB_PASS)}@acesspoint.egw5k9l.mongodb.net/?retryWrites=true&w=majority`

    const mongo = await MongoClient.connect(url)
    await mongo.connect()

    mongo.on("open", () => console.log("mongo db connection is ok"))

    mongo.on("error", () => console.log("whas detected an db error"))

    mongo.on("close", () => console.log("mongo db is closing connection"))

    const db = mongo.db("batsworks")
    return db.collection(dbCollection)
}
