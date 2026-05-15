import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/auth_public.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @Public()
  // @Post('register')
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   try {
  //     return this.authService.create(createAuthDto);
  //   } catch (error) {
  //     // puedes inspeccionar el error y lanzar un HttpException
  //     throw new HttpException(
  //       {
  //         status: error.status || 500,
  //         message: error.message || 'Error al crear la persona',
  //         details: error.detail || null, // opcional, por ejemplo para errores de DB
  //       },
  //       error.status || 500,
  //     );
  //   }
  // }
  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión y obtener tokens JWT' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
  @Public()
  @Post('refresh_token')
  @ApiOperation({ summary: 'Refrescar el access token usando el refresh token' })
  async refresh_token(@Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    return this.authService.refresh_token(token);
  }
  @Public()
  @Post('reset/code')
  @ApiOperation({ summary: 'Solicitar código de recuperación de contraseña' })
  async requestPasswordChange(@Body() emailDto: { email: string }) {
    return this.authService.requestPasswordChange(emailDto.email);
  }
  @Public()
  @Post('reset-confirm')
  @ApiOperation({ summary: 'Confirmar cambio de contraseña con el código recibido' })
  async confirmPasswordChange(
    @Body() resetDto: { email: string; newPassword: string },
  ) {
    return this.authService.confirmPasswordChange(
      resetDto.email,
      resetDto.newPassword,
    );
  }

  @Public()
  @Post('confirm-code')
  @ApiOperation({ summary: 'Verificar el código de recuperación' })
  async confirmCode(@Body() resetDto: { email: string; code: string }) {
    return await this.authService.confirmCode(resetDto.email, resetDto.code);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios (requiere autenticación)' })
  findAll() {
    return this.authService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar datos de un usuario' })
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
