import { useState } from "react";
import { UploadZone } from "./components/UploadZone";
import { JobDescInput } from "./components/JobDescInput";
import { ResumePreview } from "./components/ResumePreview";
import { useOptimizer } from "./hooks/useOptimizer";
import { FileText, Briefcase, Zap, AlertCircle, EyeOff, Eye } from "lucide-react";

function App() {
    const [resumeFiles, setResumeFiles] = useState<File[]>([]);
    const [jobDesc, setJobDesc] = useState("");
    const [htmlContent, setHtmlContent] = useState<string | null>(null);
    const [hideContactDetails, setHideContactDetails] = useState(false);

    const { mutate, isPending, error } = useOptimizer();

    const handleOptimize = () => {
        if (resumeFiles.length === 0 || !jobDesc.trim()) return;

        mutate(
            { resumeFile: resumeFiles[0], jobDescription: jobDesc, hideContactDetails },
            {
                onSuccess: (html) => {
                    setHtmlContent(html);
                },
            }
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans selection:bg-blue-500/30">
            <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <header className="mb-12 text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-900/20 mb-4">
                        <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 tracking-tight">
                        Resume Optimizer
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Tailor your resume to any job description instantly using AI.
                        Upload, paste, and get an ATS-ready PDF.
                    </p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column: Inputs */}
                    <section className="space-y-8 animate-fade-in-up">
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

                        {error && (
                            <div className="p-4 rounded-xl bg-red-900/20 border border-red-800 text-red-200 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                                <div className="text-sm">
                                    <p className="font-medium">Optimization Failed</p>
                                    <p className="opacity-80 mt-1">
                                        {(error as any)?.response?.data?.detail || "Something went wrong. Please try again."}
                                    </p>
                                </div>
                            </div>
                        )}

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
                    </section>

                    {/* Right Column: Preview */}
                    <section className="min-h-[600px] space-y-6 animate-fade-in-up delay-100 flex flex-col">
                        <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50 backdrop-blur-sm shadow-xl">
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
                        
                        <div className="flex-1 bg-gray-800/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm p-6 shadow-2xl flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-500/10 rounded-lg">
                                    <FileText className="w-5 h-5 text-green-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-200">3. Result</h2>
                            </div>
                            <div className="flex-1 rounded-xl overflow-hidden bg-gray-900/50 border border-gray-700/30">
                                <ResumePreview htmlContent={htmlContent} setHtmlContent={setHtmlContent} />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default App;
