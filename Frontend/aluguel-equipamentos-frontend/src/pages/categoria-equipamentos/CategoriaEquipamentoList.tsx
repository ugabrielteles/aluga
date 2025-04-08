import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/apiClient';
import { toast } from 'react-toastify';
import { CategoriaEquipamento } from '../../types/types';
import EditIcon from '../../components/icons/Edit';
import DeleteIcon from '../../components/icons/Delete';
import { CellContext, createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, Row } from '@tanstack/react-table';
import Modal from '../../components/ui/Modal';

const columnHelper = createColumnHelper<CategoriaEquipamento>();


export default function CategoriaEquipamentoList() {
    const [categoriasEquipamento, setCategoriasEquipamento] = useState<CategoriaEquipamento[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [rowToDelete, setRowToDelete] = useState<CategoriaEquipamento>();

    const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalDeleteTitle, setModalDeleteTitle] = useState('Remover categoria?');
    const location = useLocation()

    const navigate = useNavigate();

    const columns = [
        columnHelper.accessor('categoria_id', {
            cell: info => info.getValue(),
            header: 'ID'
        }),
        columnHelper.accessor('nome', {
            cell: info => info.getValue(),
            header: 'Nome'
        }),
        columnHelper.accessor('descricao', {
            cell: info => info.getValue(),
            header: 'Descrição'
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

    const table = useReactTable({
        data: categoriasEquipamento,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableFilters: true
    })

    useEffect(() => {
        const fetchCategoriasEquipamento = async () => {
            try {
                const response = await api.get('/categorias-equipamentos');
                setCategoriasEquipamento(response.data);
            } catch (error) {
                toast.error('Erro ao carregar as categorias de equipamentos');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategoriasEquipamento();
        
    }, [location.key]);

    const handleDelete = async (id: number | undefined) => {
        if (!id) return;

        if (window.confirm('Tem certeza que deseja excluir esta categoria equipamento?')) {
            try {
                await api.delete(`/categorias-equipamentos/${id}`);
                setCategoriasEquipamento(categoriasEquipamento.filter(e => e.categoria_id !== id));
                toast.success('Categoria equipamento excluída com sucesso');
            } catch (error) {
                toast.error('Erro ao excluir Categoria equipamento');
            }
        }
    };

    const handleEdit = async (id: number) => {
        navigate(`/categorias-equipamento/${id}`)
    }

    const onEditClick = (cellContext: CellContext<CategoriaEquipamento, CategoriaEquipamento>) => {
        handleEdit(cellContext.row.getValue('categoria_id'))
    }

    const onDeleteClick = (cellContext: CellContext<CategoriaEquipamento, CategoriaEquipamento>) => {
        setModalDeleteOpen(true);
        setRowToDelete(cellContext.row as unknown as CategoriaEquipamento)
        // handleDelete(cellContext.row.getValue('categoria_id'))
    }


    if (isLoading) {
        return <div className="flex justify-center py-8">Carregando...</div>;
    }



    return (
        <>
            <Outlet />
            <div className="p-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Categorias equipamento</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            Lista de todos as categorias de equipamentos
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            to="/categorias-equipamento/novo"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        >
                            Adicionar Categoria Equipamento
                        </Link>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className='bg-gray-50'>
                                            {table.getHeaderGroups().map(headerGroup => (
                                                <tr key={headerGroup.id}>
                                                    {headerGroup.headers.map(header => (
                                                        <th key={header.id} className='py-3.5 pl-4 pr-3 bg-white  text-sm font-semibold text-gray-900 sm:pl-6 text-left'>
                                                            {header.isPlaceholder
                                                                ? null
                                                                : flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext()
                                                                )}
                                                        </th>
                                                    ))}
                                                </tr>
                                            ))}
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {table.getRowModel().rows.map(row => (
                                                <tr key={row.id} className='hover:bg-gray-100 bg-white'>
                                                    {row.getVisibleCells().map(cell => (
                                                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900">
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title={modalDeleteTitle}
                show={isModalDeleteOpen} onCloseModal={() => setModalDeleteOpen(false)}
                onComplete={() => handleDelete(rowToDelete?.categoria_id)}
                children={
                    <>
                        <p className="text-sm text-gray-500">
                            Você realmente deseja remover a categoria
                        </p>
                    </>
                } />
        </>

    );
}