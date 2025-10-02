import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from "class-validator";

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

  return (
    d1 === parseInt(cpf[9] as string, 10) &&
    d2 === parseInt(cpf[10] as string, 10)
  );
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: "O nome do paciente nao pode ser vazio" })
  @Length(3, 100, {
    message: "O nome do paciente deve conter entre 3 e 100 caracteres",
  })
  nome!: string;

  @IsEmail()
  @Length(3, 50, {
    message: "O email do paciente deve conter entre 3 e 50 caracteres",
  })
  email!: string;

  @IsString()
  @Matches(/^\d{11}$/, {
    message: "Telefone deve conter 11 dígitos (DDD + número)",
  })
  telefone!: string;

  @IsDateString(
    {},
    { message: "Data de nascimento deve estar em formato ISO (YYYY-MM-DD)" }
  )
  dataNascimento!: Date;

  @IsEnum(["Ectomorfo", "Mesomorfo", "Endomorfo"], {
    message: "Biotipo inválido",
  })
  biotipo!: "Ectomorfo" | "Mesomorfo" | "Endomorfo";

  @IsString()
  @Matches(/^\d{11}$/, { message: "CPF deve conter 11 dígitos" })
  cpf!: string;
}
