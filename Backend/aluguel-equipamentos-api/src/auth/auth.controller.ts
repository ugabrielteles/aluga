import { Controller, Post, Body, UseGuards, Req, Get, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { User } from './user.decorator';
import { Usuario } from './entities/usuario.entity';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login do usuário' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Login realizado com sucesso',
    type: AuthResponseDto,
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Credenciais inválidas' 
  })
  async login(
    @Body() loginDto: LoginDto,
    @User() user: Usuario,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const result = await this.authService.login(user, req.ip);
    
    // Configura o cookie HTTP-only (opcional)
    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60 * 1000, // 8 horas
    });

    return {
      accessToken: result.access_token,
      usuario: result.usuario
    };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout do usuário' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Logout realizado com sucesso' 
  })
  async logout(@Res({ passthrough: true }) res: Response) {
    // Remove o cookie de autenticação
    res.clearCookie('access_token');
    return { message: 'Logout realizado com sucesso' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter informações do perfil do usuário' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Perfil do usuário retornado com sucesso',
    type: AuthResponseDto,
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Acesso não autorizado' 
  })
  getProfile(@User() user: Usuario) {
    return this.authService.getProfile(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Renovar token de acesso' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Token renovado com sucesso',
    type: AuthResponseDto,
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Token inválido ou expirado' 
  })
  async refreshToken(@User() user: Usuario) {
    const payload = { email: user.email, sub: user.id, cargo: user.cargo };
    const accessToken = this.authService.getJwtService().sign(payload);
    
    return {
      accessToken,
      usuario: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        cargo: user.cargo,
      }
    };
  }
}