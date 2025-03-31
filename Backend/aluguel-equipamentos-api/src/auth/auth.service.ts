import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService,
    private logsService: LogsService,
  ) {}

  getJwtService(): JwtService {
    return this.jwtService;
  }

  async validateUser(email: string, senha: string): Promise<any> {
    const usuario = await this.usuarioRepository.findOne({ 
      where: { email },
      select: ['id', 'nome', 'email', 'senhaHash', 'cargo', 'ativo'],
    });
    
    if (usuario && await bcrypt.compare(senha, usuario.senhaHash)) {
      const { senhaHash, ...result } = usuario;
      return result;
    }
    return null;
  }

  async login(user: any, ip?: string) {
    const payload = { 
      email: user.email, 
      sub: user.id, 
      cargo: user.cargo,
      nome: user.nome,
    };
    const accessToken = this.jwtService.sign(payload);
    
    await this.logsService.createLog(
      'LOGIN',
      user,
      null,
      null,
      null,
      { accessToken },
      ip,
    );

    return {
      access_token: accessToken,
      usuario: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        cargo: user.cargo,
      }
    };
  }

  async getProfile(usuarioId: number) {
    return this.usuarioRepository.findOne({ 
      where: { id: usuarioId },
      select: ['id', 'nome', 'email', 'cargo', 'dataCadastro']
    });
  }
}