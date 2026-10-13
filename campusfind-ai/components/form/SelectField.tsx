interface SelectFieldProps {
  label: string;
  options: string[];
}

export default function SelectField({
  label,
  options,
}: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      <select className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200">
        <option>Select</option>

        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}