import { Download } from "lucide-react";
import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

interface ResumePreviewProps {
    htmlContent: string | null;
    setHtmlContent: (html: string) => void;
}

export function ResumePreview({ htmlContent, setHtmlContent }: ResumePreviewProps) {
    const [isDownloading, setIsDownloading] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!contentRef.current) return;

        setIsDownloading(true);
        try {
            const opt = {
                margin: 0,
                filename: 'optimized_resume.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    letterRendering: true,
                    windowWidth: 794,
                    windowHeight: 1123
                },
                jsPDF: { unit: 'px', format: [794, 1123], orientation: 'portrait' }
            };

            await html2pdf().set(opt).from(contentRef.current).save();
        } catch (error) {
            console.error("Download failed:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    if (!htmlContent) {
        return (
            <div className="w-full h-full min-h-[600px] flex items-center justify-center bg-gray-800/20 border-2 border-dashed border-gray-700/50 rounded-xl">
                <p className="text-gray-500 text-sm">Preview will appear here after optimization</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700">
                <h3 className="font-medium text-gray-200">Optimized Resume</h3>
                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Download className="w-4 h-4" />
                    {isDownloading ? "Generating PDF..." : "Download PDF"}
                </button>
            </div>

            <div className="flex-1 w-full bg-white rounded-xl overflow-auto shadow-2xl">
                <div
                    ref={contentRef}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setHtmlContent(e.currentTarget.innerHTML)}
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                    className="outline-none"
                    style={{
                        width: '794px',
                        minHeight: '1123px',
                        margin: '0 auto',
                        padding: '0',
                        backgroundColor: 'white'
                    }}
                />
            </div>
        </div>
    );
}
