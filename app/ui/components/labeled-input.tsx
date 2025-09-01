type LabeledInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
};

export function LabeledInput({
  label,
  value,
  onChange,
  maxLength = 1,
}: LabeledInputProps) {
  return (
    <label className='flex items-center gap-2'>
      <span className='text-sm'>{label}</span>
      <input
        className='w-16 rounded border bg-zinc-900 text-white px-2 py-1 font-mono'
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
