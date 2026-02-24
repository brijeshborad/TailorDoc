import { ResumePreview } from "../components/ResumePreview";
import { FileText, ArrowLeft } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

interface ResultProps {
    htmlContent: string | null;
    setHtmlContent: (html: string | null) => void;
}

export function Result({ htmlContent, setHtmlContent }: ResultProps) {
    if (!htmlContent) {
        return <Navigate to="/" replace />;
    }

    return (
        <section className="min-h-[600px] space-y-6 animate-fade-in-up flex flex-col max-w-5xl mx-auto w-full">
            <div className="flex items-center justify-between mb-2">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Editor
                </Link>
            </div>

            <div className="flex-1 bg-gray-800/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm p-6 shadow-2xl flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                        <FileText className="w-5 h-5 text-green-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-200">3. Result</h2>
                </div>
                <div className="flex-1 rounded-xl overflow-hidden bg-gray-900/50 border border-gray-700/30 min-h-[700px]">
                    <ResumePreview htmlContent={htmlContent} setHtmlContent={setHtmlContent} />
                </div>
            </div>
        </section>
    );
}
