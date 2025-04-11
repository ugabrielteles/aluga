import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/apiClient';
import { toast } from 'react-toastify';
import { Equipamento } from '../../types/types';
import Table, { Column } from '../../components/ui/Table';
import PageHeader from '../../components/layout/PageHeader';
import { CellContext, createColumnHelper } from '@tanstack/react-table';
import EditIcon from '../../components/icons/Edit';
import DeleteIcon from '../../components/icons/Delete';
import Modal from '../../components/ui/Modal';

export default function EquipamentosList() {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rowToDelete, setRowToDelete] = useState<Equipamento>(null!);
  const [modalDeleteTitle, setModalDeleteTitle] = useState('Remover equipamento?');
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
  const navigate = useNavigate();


  const columnHelper = createColumnHelper<Equipamento>();

  const columns = [
    columnHelper.accessor('id', {
      cell: info => info.getValue(),
      header: 'ID'
    }),
    columnHelper.accessor('nome', {
      cell: info => info.getValue(),
      header: 'Nome'
    }),
    columnHelper.accessor('modelo', {
      cell: info => info.getValue(),
      header: 'Modelo'
    }),
    columnHelper.accessor('valorDiaria', {
      cell: info => info.getValue(),
      header: 'Valor Diária'
    }),
    columnHelper.accessor('quantidadeDisponivel', {
      cell: info => info.getValue(),
      header: 'Quantidade Disponível'
    }),
    columnHelper.accessor(row => row, {
      id: 'actions',
      header: '',
      cell: info => <>
        <button onClick={() => onEditClick(info)}>
          <EditIcon />
        </button>
        <button onClick={() => onDeleteClick(info)}>
          <DeleteIcon />
        </button>
      </>
    })
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

  const handleEdit = async (id: number) => {
    navigate(`/equipamentos/${id}`)
  }

  const onEditClick = (cellContext: CellContext<Equipamento, Equipamento>) => {
    handleEdit(cellContext.row.getValue('id'))
  }

  const onDeleteClick = (cellContext: CellContext<Equipamento, Equipamento>) => {
    const row = cellContext.row as unknown as Equipamento;
    setModalDeleteOpen(true);
    setRowToDelete(row);
    setModalDeleteTitle(row.nome)
    // handleDelete(cellContext.row.getValue('categoria_id'))
  }

  if (isLoading) {
    return <div className="flex justify-center py-8">Carregando...</div>;
  }


  return (
    <>
      <div className="p-4 sm:px-6 lg:px-8">
        <PageHeader
          Addlink="/equipamentos/novo"
          Title="Equipamentos"
          Description=" Lista de todos os equipamentos disponíveis para aluguel" />
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                {/* <Table data={equipamentos} keyAccessor={"id"} columns={columns}></Table> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={modalDeleteTitle}
        show={isModalDeleteOpen} onCloseModal={() => setModalDeleteOpen(false)}
        onComplete={() => handleDelete(rowToDelete.id)}
        children={
          <>
            <p className="text-sm text-gray-500">
              Você realmente deseja remover a categoria {modalDeleteTitle}?
            </p>
          </>
        } />
    </>

  );
}