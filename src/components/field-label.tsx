import React from 'react';

type FieldLabelProps = {
  children: React.ReactNode,
  htmlFor?: string,
}

export default function FieldLabel({
  children,
  ...rest
}: FieldLabelProps) {
  return (
    <label
      className="font-bold text-lg"
      {...rest}
    >
      {children}
    </label>
  );
}