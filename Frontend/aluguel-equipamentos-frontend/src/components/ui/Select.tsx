import React, { forwardRef, SelectHTMLAttributes } from 'react';

export interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[];
    value?: string | number;
    onChange?: (value: any) => void;
    label?: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
    className?: string;
    disabled?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            options,
            value,
            onChange,
            label,
            placeholder = 'Selecione uma opção',
            required = false,
            error,
            className = '',
            disabled = false,
        },
        ref
    ) => {
        const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            onChange?.(e.target.value);
        };

        return (
            <div className={`${className}`}>
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                        {required && <span className="text-red-500"> *</span>}
                    </label>
                )}

                <select
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    className={`
                        block w-full rounded-md border 
                        focus:border-indigo-500 focus:ring-indigo-500 
                        ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
                        ${error ? 'border-red-500' : 'border-gray-300'}
                        py-2 px-3 text-base outline-0 outline-offset-0
                    `}
                >
                    <option value="">{placeholder}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
            </div>
        );
    }

);

export default Select;