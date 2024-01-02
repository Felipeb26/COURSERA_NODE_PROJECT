import { z } from "zod"
import schedule from "node-schedule"
import axios from "axios"

require("dotenv").config()

const envSchema = z.object({
    DB_PASS: z.string().min(1),
    PORT: z.preprocess((p) => parseInt(z.string().parse(p)), z.number().gte(3000)),
    HOST: z.string()
})

const envs = process.env;
export const env = envSchema.parse(envs)

schedule.scheduleJob("0 * * * * *", () => {
    axios.get("http://localhost:3000/")
        .then((data: any) => console.log("Working"))
        .catch((err: any) => console.log(err))
})