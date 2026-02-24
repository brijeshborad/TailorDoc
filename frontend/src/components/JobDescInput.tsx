// import { Textarea } from "@headlessui/react"; // Just kidding, using standard textarea for now or simple styled one.

interface JobDescInputProps {
    value: string;
    onChange: (val: string) => void;
    disabled?: boolean;
}

export function JobDescInput({ value, onChange, disabled }: JobDescInputProps) {
    return (
        <div className="w-full space-y-2">
            <label htmlFor="job-desc" className="block text-sm font-medium text-gray-300">
                Job Description
            </label>
            <div className="relative">
                <textarea
                    id="job-desc"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    placeholder="Paste the job description here..."
                    className={`
            w-full min-h-[300px] px-4 py-3 rounded-xl
            bg-gray-900 border border-gray-700
            text-gray-100 placeholder-gray-500
            focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
            outline-none transition-all duration-200
            resize-none
            ${disabled ? "opacity-50 cursor-not-allowed bg-gray-900/50" : ""}
          `}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500 pointer-events-none">
                    {value.length} chars
                </div>
            </div>
        </div>
    );
}
