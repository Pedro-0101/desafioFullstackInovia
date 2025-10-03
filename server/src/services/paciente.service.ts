import { CriarPacienteDto } from "../dtos/paciente.dto";
import { PacienteModel } from "../models/paciente.model";

export class PacienteService {
  async inserirPaciente(dto: CriarPacienteDto) {
    // TODO: Validar CPF
    // TODO: Validar nao cadastrar com dados duplicados (cpf, email, telefone, nome)
    return PacienteModel.create({
      nome: dto.nome,
      email: dto.email,
      telefone: dto.telefone,
      dataNascimento: new Date(dto.dataNascimento),
      biotipo: dto.biotipo,
      cpf: dto.cpf,
    });
  }

  async listarPacientes() {
    return PacienteModel.find({})
      .sort({ createdAt: -1 })
      .select('_id nome email')
      .lean()
      .exec();
  }

  async alterarPaciente(id: string, dto: CriarPacienteDto) {
    const paciente = PacienteModel.findByIdAndUpdate(
      id,
      {
        $set: {
          nome: dto.nome,
          email: dto.email,
          telefone: dto.telefone,
          dataNascimento: new Date(dto.dataNascimento),
          biotipo: dto.biotipo,
          cpf: dto.cpf
        }
      },
      { new: true, runValidators: true }
    ).exec();
    if (!paciente) throw new Error("Paciente não encontrado");
    return paciente;
  }
}