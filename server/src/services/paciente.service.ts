import { Paciente, PacienteModel } from "../models/paciente.model";

export class PacienteService {
  async inserirPaciente(): Promise<Paciente> {
    const paciente = await PacienteModel.create({
      nome: "Pedro",
      email: "pedro@email.com",
      telefone: "11955554444",
      dataNascimento: new Date("1985-07-12"),
      biotipo: "Ectomorfo",
      cpf: "52955944831",
    });
    return paciente;
  }
}
