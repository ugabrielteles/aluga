import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/apiClient';
import { toast } from 'react-toastify';
import { CategoriaEquipamento } from '../../types/types';
import Input from '../../components/ui/Input';

type EquipamentoFormData = {
  nome: string;
  modelo: string;
  fabricante: string;
  numeroSerie: string;
  valorDiaria: number;
  valorSemanal?: number;
  valorMensal?: number;
  quantidadeTotal: number;
  categoriaId: number;
};

export default function EquipamentoForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const [categorias, setCategorias] = useState<CategoriaEquipamento[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EquipamentoFormData>();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get('/categorias-equipamentos');
        setCategorias(response.data);
      } catch (error) {
        toast.error('Erro ao carregar categorias');
      }
    };

    const fetchEquipamento = async () => {
      if (!id) return;
      try {
        const response = await api.get(`/equipamentos/${id}`);
        reset(response.data);
      } catch (error) {
        toast.error('Erro ao carregar equipamento');
        navigate('/equipamentos');
      }
    };

    fetchCategorias();
    if (isEditing) {
      fetchEquipamento();
    }
  }, [id, reset, navigate, isEditing]);

  const onSubmit = async (data: EquipamentoFormData) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        await api.put(`/equipamentos/${id}`, data);
        toast.success('Equipamento atualizado com sucesso');
      } else {
        await api.post('/equipamentos', data);
        toast.success('Equipamento criado com sucesso');
      }
      navigate('/equipamentos');
    } catch (error) {
      toast.error(`Erro ao ${isEditing ? 'atualizar' : 'criar'} equipamento`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Editar Equipamento' : 'Novo Equipamento'}
          </h1>
        </div>
      </div>
      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-700">
                Nome *
              </label>
                           
              <Input type="text" id="nome" {...register('nome', { required: 'Nome é obrigatório' })}></Input>
              {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="categoriaId" className="block text-sm font-medium text-gray-700">
                Categoria *
              </label>
              <select
                id="categoriaId"
                {...register('categoriaId', { required: 'Categoria é obrigatória', valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
              {errors.categoriaId && <p className="mt-1 text-sm text-red-600">{errors.categoriaId.message}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="modelo" className="block text-sm font-medium text-gray-700">
                Modelo
              </label>
              <input
                type="text"
                id="modelo"
                {...register('modelo')}
                className="block w-full p-2.5 rounded-lg bg-gray-50 border border-gray-300 text-gray-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="fabricante" className="block text-sm font-medium text-gray-700">
                Fabricante
              </label>
              <input
                type="text"
                id="fabricante"
                {...register('fabricante')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="numeroSerie" className="block text-sm font-medium text-gray-700">
                Número de Série *
              </label>
              <input
                type="text"
                id="numeroSerie"
                {...register('numeroSerie', { required: 'Número de série é obrigatório' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.numeroSerie && <p className="mt-1 text-sm text-red-600">{errors.numeroSerie.message}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="valorDiaria" className="block text-sm font-medium text-gray-700">
                Valor Diária (R$) *
              </label>
              <input
                type="number"
                id="valorDiaria"
                step="0.01"
                min="0"
                {...register('valorDiaria', { required: 'Valor diária é obrigatório', valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.valorDiaria && <p className="mt-1 text-sm text-red-600">{errors.valorDiaria.message}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="valorSemanal" className="block text-sm font-medium text-gray-700">
                Valor Semanal (R$)
              </label>
              <input
                type="number"
                id="valorSemanal"
                step="0.01"
                min="0"
                {...register('valorSemanal', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="valorMensal" className="block text-sm font-medium text-gray-700">
                Valor Mensal (R$)
              </label>
              <input
                type="number"
                id="valorMensal"
                step="0.01"
                min="0"
                {...register('valorMensal', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="quantidadeTotal" className="block text-sm font-medium text-gray-700">
                Quantidade Total *
              </label>
              <input
                type="number"
                id="quantidadeTotal"
                min="1"
                {...register('quantidadeTotal', { required: 'Quantidade é obrigatória', valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.quantidadeTotal && <p className="mt-1 text-sm text-red-600">{errors.quantidadeTotal.message}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/equipamentos')}
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}