import express from "express"
import { env } from "./config/env/env"
import { app } from "./middleware/middleware"

app.listen(env.PORT, env.HOST, () => {
    console.log(`Runnig server on http://${env.HOST}:${env.PORT}`)
});


app.get("/", (req: express.Request, res: express.Response) => {
    return res.send({ message: req.originalUrl })
})
