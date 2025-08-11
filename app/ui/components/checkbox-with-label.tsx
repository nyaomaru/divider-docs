type CheckboxWithLabelProps = {
  id?: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function CheckboxWithLabel({
  id,
  label,
  checked,
  onChange,
}: CheckboxWithLabelProps) {
  return (
    <label htmlFor={id} className='flex items-center gap-2'>
      <input
        id={id}
        type='checkbox'
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className='accent-white'
      />
      {label}
    </label>
  );
}
