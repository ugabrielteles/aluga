import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../auth/entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async onModuleInit() {
    await this.seedAdmin();
  }

  async seedAdmin() {
    const adminEmail = 'admin@admin.com';
    const adminExists = await this.usuarioRepository.findOne({ 
      where: { email: adminEmail } 
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('Gt102102_', 10);
      
      const admin = this.usuarioRepository.create({
        nome: 'Administrador',
        email: adminEmail,
        senhaHash: hashedPassword,
        cargo: 'admin',
        ativo: true,
      });

      await this.usuarioRepository.save(admin);
      console.log('Usuário admin criado com sucesso');
    }
  }
}