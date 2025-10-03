import { Router } from "express";
import { PacienteController } from "../controllers/paciente.controller";
import { validateDto } from "../core/validateDto";
import { CriarPacienteDto } from "../dtos/paciente.dto";
import expressAsyncHandler from "express-async-handler";

const router = Router()
const controller = new PacienteController()

router.post("/", validateDto(CriarPacienteDto), expressAsyncHandler(controller.criar.bind(controller)))
router.get("/", expressAsyncHandler(controller.listar.bind(controller)));
router.patch("/:id", validateDto(CriarPacienteDto), expressAsyncHandler(controller.alterar.bind(controller)))

export default router;