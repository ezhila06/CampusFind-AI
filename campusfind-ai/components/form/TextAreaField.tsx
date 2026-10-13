interface TextAreaFieldProps {
  label: string;
  placeholder: string;
}

export default function TextAreaField({
  label,
  placeholder,
}: TextAreaFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      <textarea
        rows={5}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}