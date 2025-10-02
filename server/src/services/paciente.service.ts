import { CriarPacienteDto } from "../dtos/paciente.dto";
import { PacienteModel } from "../models/paciente.model";

export class PacienteService {
  async inserirPaciente(dto: CriarPacienteDto) {
    return PacienteModel.create({
      nome: dto.nome,
      email: dto.email,
      telefone: dto.telefone,
      dataNascimento: new Date(dto.dataNascimento),
      biotipo: dto.biotipo,
      cpf: dto.cpf,
    });
  }
}