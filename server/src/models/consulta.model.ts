import { Schema, model, Types, InferSchemaType, HydratedDocument } from "mongoose";

const status = ["Agendado", "Confirmado", "Executado"] as const;

const consultaSchema = new Schema(
  {
    nutricionista: {
      type: Types.ObjectId,
      ref: "Nutricionista",
      required: true,
      index: true,
    },

    pacienteRef: {
      type: Types.ObjectId,
      ref: "Paciente",
      required: true,
      index: true,
    },

    inicio: { type: Date, required: true, index: true },
    fim: { type: Date, required: true, index: true },

    observacoes: { type: String, trim: true },
    status: { type: String, enum: status, required: true },
  },
  { timestamps: true }
);

// Tipo com campos obrigatórios definidos no schema de consulta (sem _id e métodos do mongoose)
export type Consulta = InferSchemaType<typeof consultaSchema>;

// Documento retornado do banco já "hidratado", incluindo _id, createdAt, updatedAt e métodos do mongoose
export type ConsultaDocument = HydratedDocument<Consulta>;

// Modelo usado pelo mongoose para comunicar com o banco (consultas, inserts, updates, deletes)
export const ConsultaModel = model("Consulta", consultaSchema);
