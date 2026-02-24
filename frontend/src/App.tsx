import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useOptimizer } from "./hooks/useOptimizer";
import { Zap } from "lucide-react";
import Landing from "./pages/Landing";
import { Optimize } from "./pages/Optimize";
import { Result } from "./pages/Result";

function AppContent() {
    const [resumeFiles, setResumeFiles] = useState<File[]>([]);
    const [jobDesc, setJobDesc] = useState("");
    const [htmlContent, setHtmlContent] = useState<string | null>(null);
    const [hideContactDetails, setHideContactDetails] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const { mutate, isPending, error } = useOptimizer();

    const handleOptimize = () => {
        if (resumeFiles.length === 0 || !jobDesc.trim()) return;

        mutate(
            { resumeFile: resumeFiles[0], jobDescription: jobDesc, hideContactDetails },
            {
                onSuccess: (html) => {
                    setHtmlContent(html);
                    navigate("/result");
                },
            }
        );
    };

    const isLandingPage = location.pathname === "/";

    return (
        <div className={`min-h-screen ${isLandingPage ? "" : "bg-[#0a0a0f] text-gray-100 font-sans selection:bg-violet-500/30"}`}>
            {!isLandingPage && (
                <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <header className="mb-12 text-center space-y-4">
                        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-600 shadow-lg shadow-violet-900/20 mb-4 cursor-pointer" onClick={() => navigate("/")}>
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 tracking-tight">
                            Tailor Doc
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Tailor your resume to any job description instantly using AI.
                        </p>
                    </header>
                    <main>
                        <Routes>
                            <Route
                                path="/optimize"
                                element={
                                    <Optimize
                                        resumeFiles={resumeFiles}
                                        setResumeFiles={setResumeFiles}
                                        jobDesc={jobDesc}
                                        setJobDesc={setJobDesc}
                                        hideContactDetails={hideContactDetails}
                                        setHideContactDetails={setHideContactDetails}
                                        handleOptimize={handleOptimize}
                                        isPending={isPending}
                                        error={error}
                                    />
                                }
                            />
                            <Route
                                path="/result"
                                element={<Result htmlContent={htmlContent} setHtmlContent={setHtmlContent} />}
                            />
                        </Routes>
                    </main>
                </div>
            )}

            <Routes>
                <Route path="/" element={<Landing />} />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
