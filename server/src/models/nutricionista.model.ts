import { Schema, model, InferSchemaType } from "mongoose";

const nutricionistaSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export type Nutricionista = InferSchemaType<typeof nutricionistaSchema>;
export const NutricionistaModel = model("Nutricionista", nutricionistaSchema);