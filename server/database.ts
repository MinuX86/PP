import { set, connect, ConnectOptions } from "mongoose";

// track the connection
let isConnected = false;

export default async function connectToDB(
  // set the connection options
  connectOptions: ConnectOptions = {
    dbName: "profile",
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  }
) {
  set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await connect(process.env.MONGODB_URI || "", {
      dbName: "share_prompt",
      ...connectOptions,
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}
