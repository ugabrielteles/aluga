import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from '../../api/apiClient';
import { toast } from 'react-toastify';
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";

type CategoriaEquipamentoFormData = {
  categoria_id?: string;
  nome: string;
  descricao?: string;
}

export default function CategoriaEquipamentoForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CategoriaEquipamentoFormData>();

  useEffect(() => {
    const fetchCategoriaEquipamento = async () => {
      if (!id) return;
      try {
        const response = await api.get(`/categorias-equipamentos/${id}`);
        reset(response.data);
      } catch (error) {
        toast.error(`Erro ao carregar as categoria do equipamento: ${id}`);
        navigate('/categorias-equipamentos');
      }
    };

    if (isEditing) {
      fetchCategoriaEquipamento();
    }

  }, [id, reset, navigate, isEditing]);

  const onSubmit = async (data: CategoriaEquipamentoFormData) => {
    console.log(data)
    setIsLoading(true);
    try {
      if (isEditing) {
        await api.put(`/categorias-equipamentos/${id}`, data);
        toast.success('Categoria de equipamento atualizada com sucesso');
      } else {
        await api.post('/categorias-equipamentos', data);
        toast.success('Categoria de equipamento criada com sucesso');
      }
      navigate('/categorias-equipamento');

    } catch (error) {
      toast.error(`Erro ao ${isEditing ? 'atualizar' : 'criar'} a categoria de equipamento`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnCloseModal = () => {
    setIsModalOpen(false);
    navigate('/categorias-equipamento')
  }

  return (
    <Modal
      onCloseModal={() => handleOnCloseModal()}
      show={isModalOpen} 
      isLoading={isLoading}
      title={isEditing ? 'Editar categoria de equipamento' : 'Nova categoria equipamento'}
      onComplete={() => formRef.current?.requestSubmit()}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" ref={formRef}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {isEditing && <div className="sm:col-span-3">
                <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-700">
                  ID *
                </label>

                <Input type="text" disabled id="id" {...register('categoria_id', { required: 'Nome é obrigatório' })} error={errors.nome && errors.nome.message}></Input>
              </div>}
              <div className={`sm:col-span-${isEditing ? '3' : '3'}`}>
                <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-700">
                  Nome *
                </label>

                <Input type="text" id="nome" {...register('nome', { required: 'Nome é obrigatório' })} error={errors.nome && errors.nome.message}></Input>
              </div>
              <div className={`sm:col-span-${isEditing ? '3' : '3'}`}>
                <label htmlFor="descricao" className="block mb-2 text-sm font-medium text-gray-700">
                  Descricao
                </label>

                <Input type="text" id="descricao" {...register('descricao')} error={errors.descricao && errors.descricao.message}></Input>
              </div>


            </div>

            {/* <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/categorias-equipamento')}
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
            </div> */}
          </form>
    </Modal>

  )
}