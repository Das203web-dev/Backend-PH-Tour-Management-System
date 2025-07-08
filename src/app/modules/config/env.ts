import dotenv from "dotenv"
dotenv.config()


interface IEnvTYpes {
    PORT: string,
    DB_URl: string,
    NODE_ENV: "development" | "production"
}
const loadEnvVars = (): IEnvTYpes => {
    const requiredENvVAriables: string[] = ["PORT", "DB_URL", "NODE_ENV"];
    requiredENvVAriables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing required env variables ${key}`)
        }
    })
    return {
        PORT: process.env.PORT as string,
        DB_URl: process.env.DB_URL as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production"
    }
}
export const envVariables: IEnvTYpes = loadEnvVars()