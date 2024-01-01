import { MongoClient } from "mongodb";
import { expect, test } from "vitest";
import { env } from "../src/config/env/env";

const connect = async () => {
    const url = `mongodb+srv://batsworks:${encodeURIComponent(env.DB_PASS)}@acesspoint.egw5k9l.mongodb.net/?retryWrites=true&w=majority`

    const mongo = await MongoClient.connect(url)
    await mongo.connect()

    mongo.once("open", () => {
        console.log("Connection Suceffuly")
        return true
    })
}

test("", () =>{
    expect(connect()).toBeTruthy()
})
