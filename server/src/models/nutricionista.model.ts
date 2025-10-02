import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";

const nutricionistaSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// Tipo com campos obrigatórios definidos no schema de nutricionista (sem _id e métodos do mongoose)
export type Nutricionista = InferSchemaType<typeof nutricionistaSchema>;

// Documento retornado do banco já "hidratado", incluindo _id, createdAt, updatedAt e métodos do mongoose
export type NutricionistaDocument = HydratedDocument<Nutricionista>;

// Modelo usado pelo mongoose para comunicar com o banco (consultas, inserts, updates, deletes)
export const NutricionistaModel = model("Nutricionista", nutricionistaSchema);