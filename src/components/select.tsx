import classnames from 'classnames';
import { useMemo } from 'react';
import FieldLabel from './field-label';

type SelectProps = {
  id?: string,
  name: string,
  label?: string,
  className?: string,
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  value?: string | number,
  options: { label: string, value: string }[],
  placeholder?: string,
};

function Select({
  id,
  name,
  label,
  className,
  onChange,
  options,
  placeholder = 'Select',
  ...rest
}: SelectProps) {

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

  const childrenOptions = useMemo(() => options.map((opt) => (
    <option value={opt.value}>{opt.label}</option>
  )), [options]);

  return (
    <div className="flex flex-col my-4">
      {labelComponent}
      <select
        name={name}
        className={classnames('border border-black p-2', className)}
        onChange={onChange}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {childrenOptions}
      </select>
    </div>
  );
}

export default Select;
