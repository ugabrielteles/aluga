import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/apiClient';
import { toast } from 'react-toastify';
import { CategoriaEquipamento } from '../../types/types';
import EditIcon from '../../components/icons/Edit';
import DeleteIcon from '../../components/icons/Delete';
import { CellContext, createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, Row } from '@tanstack/react-table';
import Modal from '../../components/ui/Modal';
import PageHeader from '../../components/layout/PageHeader';
import { AxiosError } from 'axios';

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

        try {
            await api.delete(`/categorias-equipamentos/${id}`);
            setCategoriasEquipamento(categoriasEquipamento.filter(e => e.categoria_id !== id));
            toast.success('Categoria equipamento excluída com sucesso');
        } catch (error) {
            if (error instanceof AxiosError) {
                
                toast.error(error.response?.data?.message);
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
        debugger
        const row = cellContext.row.original as unknown as CategoriaEquipamento;
        setModalDeleteOpen(true);
        setRowToDelete(row);
    }


    if (isLoading) {
        return <div className="flex justify-center py-8">Carregando...</div>;
    }



    return (
        <>
            <Outlet />
            <div className="p-4 sm:px-6 lg:px-8">
                <PageHeader
                    Addlink="/categorias-equipamento/novo"
                    Title="Categorias equipamento"
                    Description="Lista de todos as categorias de equipamentos" />
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
                title="Remover Categoria?"
                show={isModalDeleteOpen} onCloseModal={() => setModalDeleteOpen(false)}
                onComplete={() => handleDelete(rowToDelete?.categoria_id)}
                children={
                    <>
                        <p className="text-sm text-gray-500">
                            Você realmente deseja remover a categoria <b>{rowToDelete?.nome}</b>?
                        </p>
                    </>
                } />
        </>

    );
}