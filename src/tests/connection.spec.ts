import { urlencoded } from "express";
import { MongoClient } from "mongodb";

const connect = async () =>{
    const url = `mongodb+srv://batsworks:${encodeURIComponent("Lipe@26")}@acesspoint.egw5k9l.mongodb.net/?retryWrites=true&w=majority`

    console.log(url)
    const mongo = await MongoClient.connect(url)
    await mongo.connect()

    console.log(mongo.db())
}

connect()
