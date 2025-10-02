import { Request, Response } from "express";
import { PacienteService } from "../services/paciente.service";
import { CriarPacienteDto } from "../dtos/paciente.dto";

const service = new PacienteService();

export class PacienteController {
  async criar(req: Request, res: Response) {
    const dto: CriarPacienteDto = req.body;
    const paciente = await service.inserirPaciente(dto);

    res.status(201).json({
      id: paciente._id,
      nome: paciente.nome,
      email: paciente.email,
      telefone: paciente.telefone,
      dataNascimento: paciente.dataNascimento,
      biotipo: paciente.biotipo,
      cpf: paciente.cpf,
      criadoEm: paciente.createdAt,
      atualizadoEm: paciente.updatedAt,
    });
  }
}
