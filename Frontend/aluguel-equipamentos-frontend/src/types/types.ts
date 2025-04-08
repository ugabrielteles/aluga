export interface Usuario {
    id: number;
    nome: string;
    email: string;
    cargo: string;
  }
  
  export interface Equipamento {
    id: number;
    nome: string;
    descricao?: string;
    modelo?: string;
    fabricante?: string;
    numeroSerie: string;
    valorDiaria: number;
    valorSemanal?: number;
    valorMensal?: number;
    quantidadeTotal: number;
    quantidadeDisponivel: number;
    dataAquisicao?: Date;
    valorAquisicao?: number;
    categoria: CategoriaEquipamento;
  }
  
  export interface CategoriaEquipamento {
    categoria_id: number;
    nome: string;
    descricao?: string;
  }
  
  export interface Cliente {
    id: number;
    nome: string;
    tipo: string;
    cpfCnpj: string;
    rgIe?: string;
    endereco?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
    telefone?: string;
    email?: string;
    ativo: boolean;
  }
  
  export interface Contrato {
    id: number;
    dataContrato: Date;
    dataInicio: Date;
    dataTermino: Date;
    valorTotal: number;
    valorFinal: number;
    cliente: Cliente;
    itens: ContratoItem[];
    kits: ContratoKit[];
  }
  
  export interface ContratoItem {
    id: number;
    equipamento: Equipamento;
    quantidade: number;
    valorUnitario: number;
    periodo: string;
  }
  
  export interface ContratoKit {
    id: number;
    kit: Kit;
    quantidade: number;
    valorUnitario: number;
    periodo: string;
  }
  
  export interface Kit {
    id: number;
    nome: string;
    descricao?: string;
    valorDiaria: number;
    valorSemanal?: number;
    valorMensal?: number;
    itens: KitItem[];
  }
  
  export interface KitItem {
    id: number;
    equipamento: Equipamento;
    quantidade: number;
  }