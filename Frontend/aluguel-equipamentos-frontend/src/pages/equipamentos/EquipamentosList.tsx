import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/apiClient';
import { toast } from 'react-toastify';
import { Equipamento } from '../../types/types';
import Table, { Column } from '../../components/ui/Table';

export default function EquipamentosList() {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns: Column<any>[] = [
    {
      header: "ID",
      accessor: 'id'
    },
    {
      header: 'Nome',
      accessor: 'nome'
    },
    {
      header: 'Modelo',
      accessor: 'modelo'
    },
    {
      header: 'Valor Diária',
      accessor: 'valorDiaria'
    },
    {
      header: 'Disponível',
      accessor: 'quantidadeDisponivel'
    }
  ]

  useEffect(() => {
    const fetchEquipamentos = async () => {
      try {
        const response = await api.get('/equipamentos');
        setEquipamentos(response.data);
      } catch (error) {
        toast.error('Erro ao carregar equipamentos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEquipamentos();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este equipamento?')) {
      try {
        await api.delete(`/equipamentos/${id}`);
        setEquipamentos(equipamentos.filter(e => e.id !== id));
        toast.success('Equipamento excluído com sucesso');
      } catch (error) {
        toast.error('Erro ao excluir equipamento');
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-8">Carregando...</div>;
  }

  return (
    <div className="p-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Equipamentos</h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todos os equipamentos disponíveis para aluguel
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/equipamentos/novo"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Adicionar equipamento
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">

              <Table data={equipamentos} keyAccessor={"id"} columns={columns}></Table>             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}