import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileText, XCircle } from "lucide-react";

interface UploadZoneProps {
    files: File[];
    setFiles: (files: File[]) => void;
    disabled?: boolean;
}

export function UploadZone({ files, setFiles, disabled }: UploadZoneProps) {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            setFiles(acceptedFiles); // Only allow one file for now if needed, or multiple
        },
        [setFiles]
    );

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        },
        maxFiles: 1,
        disabled,
    });

    return (
        <div className="w-full">
            <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out cursor-pointer flex flex-col items-center justify-center gap-4
          ${isDragActive
                        ? "border-blue-500 bg-blue-50/5"
                        : "border-gray-600 hover:border-gray-500 bg-gray-800/30"
                    }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${isDragReject ? "border-red-500 bg-red-900/10" : ""}
        `}
            >
                <input {...getInputProps()} />

                <div className="p-4 rounded-full bg-gray-800/80 shadow-inner">
                    <UploadCloud className={`w-8 h-8 ${isDragActive ? "text-blue-400" : "text-gray-400"}`} />
                </div>

                <div className="text-center space-y-2">
                    <p className="text-lg font-medium text-gray-200">
                        {isDragActive ? "Drop the resume here" : "Upload your resume"}
                    </p>
                    <p className="text-sm text-gray-400">
                        Drag & drop or click to browse (PDF, DOCX)
                    </p>
                </div>
            </div>

            {files.length > 0 && (
                <div className="mt-4 space-y-2">
                    {files.map((file) => (
                        <div
                            key={file.name}
                            className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50"
                        >
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-blue-400" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-200 truncate max-w-[200px]">
                                        {file.name}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFiles([]);
                                }}
                                className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                                disabled={disabled}
                            >
                                <XCircle className="w-5 h-5 text-gray-400 hover:text-red-400" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
