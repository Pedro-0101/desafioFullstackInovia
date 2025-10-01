import { Schema, model, Types, InferSchemaType } from "mongoose";

const consultaSchema = new Schema(
    {
        nutricionista: {
            type: Types.ObjectId,
            ref: "Nutricionista",
            required: true,
            index: true
        },

        pacienteRef: {
            type: Types.ObjectId,
            ref: "Paciente",
            required: true,
            index: true
        },

        inicio: { type: Date, required: true, index: true },
        fim: { type: Date, required: true, index: true },

        observacoes: { type: String, trim: true }
    },
    { timestamps: true }
);

export type Consulta = InferSchemaType<typeof consultaSchema>;
export const ConsultaModel = model("Consulta", consultaSchema);
