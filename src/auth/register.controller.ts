import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import {
  RegisterDoctorDTO,
  RegisterNurseDTO,
  RegisterPatientDTO,
  RegisterRO,
  RegisterStaffDTO,
} from './dto/register.dto';
import { RegisterService } from './register.service';

@ApiTags('Register')
@Controller('register')
export class RegisterController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly authService: AuthService,
  ) {}

  @Post('patient')
  async registerPatient(@Body() body: RegisterPatientDTO): Promise<RegisterRO> {
    const { email, password, patient } = body;
    const id = await this.registerService.registerPatient(
      email,
      password,
      patient,
    );
    const userWithPatient = await this.registerService.getPatientById(id);
    const tokens = await this.authService.login(email, password);
    return {
      code: 'OK',
      data: userWithPatient,
      tokens,
    };
  }

  @Post('doctor')
  async registerDoctor(@Body() body: RegisterDoctorDTO): Promise<RegisterRO> {
    const { email, password, doctor } = body;
    const id = await this.registerService.registerDoctor(
      email,
      password,
      doctor,
    );
    const userWithDoctor = await this.registerService.getDoctorById(id);
    const tokens = await this.authService.login(email, password);
    return {
      code: 'OK',
      data: userWithDoctor,
      tokens,
    };
  }

  @Post('nurse')
  async registerNurse(@Body() body: RegisterNurseDTO): Promise<RegisterRO> {
    const { email, password, nurse } = body;
    const id = await this.registerService.registerNurse(email, password, nurse);
    const userWithNurse = await this.registerService.getNurseById(id);
    const tokens = await this.authService.login(email, password);
    return {
      code: 'OK',
      data: userWithNurse,
      tokens,
    };
  }

  @Post('staff')
  async registerStaff(@Body() body: RegisterStaffDTO): Promise<RegisterRO> {
    const { email, password, staff } = body;
    const id = await this.registerService.registerStaff(email, password, staff);
    const userWithStaff = await this.registerService.getStaffById(id);
    const tokens = await this.authService.login(email, password);
    return {
      code: 'OK',
      data: userWithStaff,
      tokens,
    };
  }
}
