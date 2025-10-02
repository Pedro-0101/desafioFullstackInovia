import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";

const biotipos = ["Ectomorfo", "Mesomorfo", "Endomorfo"] as const;
export type Biotipo = (typeof biotipos)[number];

const pacienteSchema = new Schema(
  {
    nome: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    telefone: {
      type: String,
      required: true,
    },
    dataNascimento: { type: Date, required: true },
    biotipo: { type: String, enum: biotipos, required: true },
    cpf: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

pacienteSchema.index({ cpf: 1 }, { unique: true });

// Tipo com campos obrigatorios para criacao de paciente
export type Paciente = InferSchemaType<typeof pacienteSchema>;
// HydratedDocument insere campos como _id, createdAt e updatedAt
export type PacienteDocument = HydratedDocument<Paciente>; 
// Modelo usoado pelo mongoose para comunicar com o banco
export const PacienteModel = model("Paciente", pacienteSchema);
