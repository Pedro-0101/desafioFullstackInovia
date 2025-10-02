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

// Tipo com campos obrigatórios definidos no schema de paciente (sem _id e métodos do mongoose)
export type Paciente = InferSchemaType<typeof pacienteSchema>;

// Documento retornado do banco já "hidratado", incluindo _id, createdAt, updatedAt e métodos do mongoose
export type PacienteDocument = HydratedDocument<Paciente>;

// Modelo usado pelo mongoose para comunicar com o banco (consultas, inserts, updates, deletes)
export const PacienteModel = model<Paciente>("Paciente", pacienteSchema);
