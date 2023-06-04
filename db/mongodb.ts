import { set, connect, ConnectOptions } from "mongoose";

// track the connection
let isConnected = false;

// set the connection options
const connectOptions: ConnectOptions = {
  dbName: "profile",
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

export const connectToDB = async () => {
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
};
