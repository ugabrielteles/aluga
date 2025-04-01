import React, { InputHTMLAttributes, forwardRef } from 'react';

type InputSize = 'sm' | 'md' | 'lg';
type InputVariant = 'default' | 'flushed';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeInput?: InputSize;
  variant?: InputVariant;
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      sizeInput = 'md',
      variant = 'default',
      label,
      error,
      leftIcon,
      rightIcon,
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'py-1.5 px-3 text-sm',
      md: 'py-2 px-4 text-base',
      lg: 'py-3 px-5 text-lg',
    };

    const variantClasses = {
      default: 'block w-full p-2.5 rounded-lg bg-gray-50 border focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 outline-0 outline-offset-0',
      flushed: 'border-b-2 border-gray-300 focus:border-indigo-500 bg-transparent px-0 rounded-none',
    };

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full ${sizeClasses[sizeInput]} ${variantClasses[variant]} ${
              error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
            } ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${
              props.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
            }`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;