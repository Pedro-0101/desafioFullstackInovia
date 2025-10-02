import mongoose from "mongoose";

export async function conectarMongo(uri: string) {
  mongoose.set("strictQuery", true);

  await mongoose.connect(uri, {
  } as any);

  console.log("✅ MongoDB conectado");
}

export async function limparBanco() {
  for (const nome of Object.keys(mongoose.connection.collections)) {
  const collection = mongoose.connection.collections[nome];
  if (collection) {
    await collection.deleteMany({});
  }
}
  console.log("🧹 Banco limpo!");
}