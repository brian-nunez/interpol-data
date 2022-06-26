import classnames from 'classnames';
import { useMemo } from 'react';
import FieldLabel from './field-label';

type InputProps = {
  id?: string,
  name: string,
  type: 'text' | 'number' | 'email' | 'radio' | 'button',
  label?: string,
  className?: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string,
  value?: string | number,
  min?: number,
  max?: number,
};

function Input({
  id,
  name,
  type,
  label,
  className,
  onChange,
  ...rest
}: InputProps) {

  const labelComponent = useMemo(() => {
    if (!label) {
      return null;
    }

    return (
      <FieldLabel
        htmlFor={id || name}
      >
        {label}
      </FieldLabel>
    );
  }, [label]);

  return (
    <div className="flex flex-col my-4">
      {labelComponent}
      <input
        name={name}
        type={type}
        className={classnames('border border-black p-2', className)}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}

export default Input;
