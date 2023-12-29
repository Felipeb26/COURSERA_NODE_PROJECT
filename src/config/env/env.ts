import { z } from "zod"
require("dotenv").config()

const envSchema = z.object({
    DB_PASS: z.string().min(1),
    PORT: z.preprocess((p) => parseInt(z.string().parse(p)), z.number().gte(3000)),
    HOST: z.string()
})

const envs = process.env;
export const env = envSchema.parse(envs)