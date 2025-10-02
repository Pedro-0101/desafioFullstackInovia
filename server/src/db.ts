import mongoose from "mongoose";

export async function conectarMongo(uri: string) {
  mongoose.set("strictQuery", true);

  await mongoose.connect(uri, {
  } as any);

  console.log("✅ MongoDB conectado");
}