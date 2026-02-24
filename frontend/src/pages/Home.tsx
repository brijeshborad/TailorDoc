import { UploadZone } from "../components/UploadZone";
import { JobDescInput } from "../components/JobDescInput";
import { FileText, Briefcase, Zap, AlertCircle, EyeOff, Eye } from "lucide-react";

interface HomeProps {
    resumeFiles: File[];
    setResumeFiles: (files: File[]) => void;
    jobDesc: string;
    setJobDesc: (desc: string) => void;
    hideContactDetails: boolean;
    setHideContactDetails: (hide: boolean) => void;
    handleOptimize: () => void;
    isPending: boolean;
    error: any;
}

export function Home({
    resumeFiles,
    setResumeFiles,
    jobDesc,
    setJobDesc,
    hideContactDetails,
    setHideContactDetails,
    handleOptimize,
    isPending,
    error,
}: HomeProps) {
    return (
        <section className="space-y-8 animate-fade-in-up max-w-4xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <FileText className="w-5 h-5 text-blue-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-200">1. Upload Resume</h2>
                    </div>
                    <UploadZone
                        files={resumeFiles}
                        setFiles={setResumeFiles}
                        disabled={isPending}
                    />
                </div>

                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <Briefcase className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-200">2. Job Description</h2>
                    </div>
                    <JobDescInput
                        value={jobDesc}
                        onChange={setJobDesc}
                        disabled={isPending}
                    />
                </div>
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50 backdrop-blur-sm shadow-xl max-w-md mx-auto w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            {hideContactDetails ? <EyeOff className="w-5 h-5 text-purple-400" /> : <Eye className="w-5 h-5 text-purple-400" />}
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-gray-200">Privacy Settings</h3>
                            <p className="text-xs text-gray-400">Hide contact information</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={hideContactDetails}
                            onChange={(e) => setHideContactDetails(e.target.checked)}
                            disabled={isPending}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                    </label>
                </div>
            </div>

            {error && (
                <div className="p-4 rounded-xl bg-red-900/20 border border-red-800 text-red-200 flex items-start gap-3 max-w-md mx-auto">
                    <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                    <div className="text-sm">
                        <p className="font-medium">Optimization Failed</p>
                        <p className="opacity-80 mt-1">
                            {(error as any)?.response?.data?.detail || "Something went wrong. Please try again."}
                        </p>
                    </div>
                </div>
            )}

            <div className="max-w-md mx-auto">
                <button
                    onClick={handleOptimize}
                    disabled={isPending || resumeFiles.length === 0 || !jobDesc.trim()}
                    className={`
                        w-full py-4 px-6 rounded-xl font-bold text-lg shadow-lg transform transition-all duration-200
                        flex items-center justify-center gap-3
                        ${isPending
                            ? "bg-gray-700 text-gray-400 cursor-wait"
                            : resumeFiles.length > 0 && jobDesc.trim()
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white hover:scale-[1.02] shadow-blue-900/30"
                                : "bg-gray-800 text-gray-500 cursor-not-allowed"
                        }
                    `}
                >
                    {isPending ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            Optimizing...
                        </>
                    ) : (
                        <>
                            <Zap className="w-5 h-5" />
                            Generate Optimized Resume
                        </>
                    )}
                </button>
            </div>
        </section>
    );
}
