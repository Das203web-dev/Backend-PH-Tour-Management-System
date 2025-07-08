/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVariables } from "./app/modules/config/env";
let server: Server;

const serverConnect = async () => {
    try {
        await mongoose.connect(envVariables.DB_URl)
        console.log("connected to DB");
        server = app.listen(envVariables.PORT, () => {
            console.log(`Server is listening to port ${envVariables.PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
}
serverConnect()





// server error handeling 

process.on("SIGTERM", () => {
    console.log("SIGTERM message received...Server is shutting down");
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
});
process.on("SIGINT", () => {
    console.log("SIGTINT message received...Server is shutting down");
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})



process.on("unhandledRejection", (error) => {
    console.log("Unhandled rejection detected...Shutting down the server", error);
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})
// Promise.reject(new Error("I forgot to catch this promise"));




process.on("uncaughtException", (error) => {
    console.log("Uncaught rejection detected..Server is shutting down", error);
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
});
// throw new Error("I forgot to handled the uncaught exception error")

