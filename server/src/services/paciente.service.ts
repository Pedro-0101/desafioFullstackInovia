import { CreatePacienteDto } from "../dtos/paciente.dto";
import { Paciente, PacienteDocument, PacienteModel } from "../models/paciente.model";

export class PacienteService {
  async inserirPaciente(dto: CreatePacienteDto): Promise<PacienteDocument> {
    const paciente: PacienteDocument = await PacienteModel.create({
      nome: dto.nome,
      email: dto.email,
      telefone: dto.telefone,
      dataNascimento: new Date(dto.dataNascimento),
      biotipo: dto.dataNascimento,
      cpf: dto.cpf,
    });
    return paciente;
  }
}
