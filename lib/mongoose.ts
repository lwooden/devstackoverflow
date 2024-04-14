import mongoose from "mongoose"

let isConnected: boolean = false

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true)

  if (!process.env.MONGODB_URL) {
    console.log("=> MongoDB URL is not defined!")
  }

  if (isConnected) {
    console.log("=> using existing database connection")
    return
  }

  console.log("=> using new database connection")

  try {
    await mongoose.connect(process.env.MONGODB_URL ?? "", {
      dbName: "devstackoverflow",
    })

    isConnected = true
    console.log("=> database connected")
  } catch (error) {
    console.log("=> error connecting to database:", error)
  }
}
