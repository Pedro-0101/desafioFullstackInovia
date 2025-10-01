import { Schema, model, InferSchemaType } from "mongoose";

const REGEX_TELEFONE_BRASIL = /^(?:\+?55\s?)?(?:\(?\d{2}\)?\s?)?(?:9\d{4}[-\s]?\d{4})$/;

export function validarCPF(cpf?: string): boolean {
    if (!cpf) return false;
  

    cpf = cpf.replace(/\D/g, ""); // Remove caracteres nao numericos
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false; // Retorna falso se cpf é numero repetido
  
    const calc = (base: string, fator: number) => {
      let soma = 0;
      for (let i = 0; i < base.length; i++) {
        soma += parseInt(base[i] as string, 10) * (fator - i);
      }
      const resto = (soma * 10) % 11;
      return resto === 10 ? 0 : resto;
    };
  
    const d1 = calc(cpf.substring(0, 9), 10);
    const d2 = calc(cpf.substring(0, 10), 11);
  
    return d1 === parseInt(cpf[9] as string, 10) && d2 === parseInt(cpf[10] as string, 10);
}

const biotipos = ["Ectomorfo", "Mesomorfo", "Endomorfo"] as const;
export type Biotipo = (typeof biotipos)[number];

const pacienteSchema = new Schema(
  {
    nome: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    telefone: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => REGEX_TELEFONE_BRASIL.test(v),
        message: "Telefone inválido"
      }
    },
    dataNascimento: { type: Date, required: true },
    biotipo: { type: String, enum: biotipos, required: true },
    cpf: {
      type: String,
      required: true,
      unique: true,
      set: (v: string) => (v ? v.replace(/\D/g, "") : v),
      validate: {
        validator: (v: string) => validarCPF(v),
        message: "CPF inválido"
      }
    }
  },
  { timestamps: true }
);

pacienteSchema.index({ cpf: 1 }, { unique: true });

export type Paciente = InferSchemaType<typeof pacienteSchema>;
export const PacienteModel = model("Paciente", pacienteSchema);
