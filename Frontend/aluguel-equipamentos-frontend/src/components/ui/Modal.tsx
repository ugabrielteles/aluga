'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export interface ModalProps {
    show: boolean;
    children?: any;
    title: string;
    icon?: any;
    showIcon?: boolean;
    cancelButtonText?: string;
    confirmButtonText?: string;
    confirmButtonType?: 'submit' | 'button' | 'reset'
    disabledConfirmButton?: boolean;
    isLoading?: boolean;
    onCloseModal: (event: any) => void;
    onComplete?: () => void;
}

export default function Modal({ show, children, title, icon, cancelButtonText, confirmButtonText, disabledConfirmButton, confirmButtonType, isLoading, onCloseModal, onComplete }: ModalProps) {
    return (
        <Dialog open={show} onClose={() => null} className="relative z-40" >
            <DialogBackdrop

                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <DialogTitle as="h3" className="text-base font-semibold text-gray-900  flex flex-row gap-2">
                                {title}
                            </DialogTitle>
                        </div>

                        <div className="bg-white px-6 pt-4  pb-4">
                            {children}
                        </div>
                        <div className="flex px-4 py-3 space-x-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2 bg-gray-50">
                            <button
                                type={confirmButtonType ?? 'submit'}
                                onClick={(event) => {
                                    if (onComplete && typeof onComplete === 'function') {
                                        onComplete();
                                    }
                                }}
                                disabled={isLoading ?? false}
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                {confirmButtonText ?? 'Confirmar'}
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={onCloseModal}
                                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                {cancelButtonText ?? 'Cancelar'}
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
