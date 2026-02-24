import { Link } from "react-router-dom";
import {
    Wand2,
    Sparkles,
    ArrowRight,
    FileText,
    CheckCircle2,
    Upload,
    ClipboardList,
    Download,
    Zap,
    Target,
    Lock,
    BrainCircuit,
    Star,
    Twitter,
    Github,
    Linkedin,
    Menu,
    X,
    Cpu
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Landing() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-200 selection:bg-violet-500/30 font-sans overflow-x-hidden">

            {/* SECTION: NAVBAR */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/10 py-3" : "bg-transparent py-5"
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-1.5 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-lg group-hover:rotate-12 transition-transform">
                            <Wand2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white">TailorDoc</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {["Features", "How It Works"].map((item) => (
                            <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            to="/optimize"
                            className="px-5 py-2.5 rounded-full bg-violet-600/10 border border-violet-500/50 text-violet-400 text-sm font-bold hover:bg-violet-600 hover:text-white transition-all glow-violet"
                        >
                            Get Started Free
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4 animate-fade-in-down">
                        {["Features", "How It Works", "Pricing"].map((item) => (
                            <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} className="text-lg font-medium text-slate-400" onClick={() => setIsMobileMenuOpen(false)}>
                                {item}
                            </a>
                        ))}
                        <div className="pt-4 flex flex-col gap-4 border-t border-white/10">
                            <button className="text-lg font-medium text-slate-400 text-left">Sign In</button>
                            <Link to="/optimize" className="w-full py-3 rounded-xl bg-violet-600 text-white text-center font-bold">
                                Get Started Free
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            <main>
                {/* SECTION: HERO SECTION */}
                <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
                    {/* Animated Background Orbs */}
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 blur-[120px] rounded-full animate-pulse-glow" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse-glow" />

                    <div className="container mx-auto text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 mb-8 animate-fade-in">
                            <Sparkles className="w-4 h-4 text-violet-400" />
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                Powered by Llama 3.3 · Groq Inference
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-1">
                            <span className="block text-white mb-2">Your Resume Is</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 animate-text-shimmer h-28">
                                Getting Ignored.
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                            TailorDoc fixes that. In seconds. Most resumes never reach a human. Our AI rewrites yours —
                            tailored to each job description — so you pass the ATS filters and land on the recruiter's desk.
                            <span className="text-white font-medium italic block mt-2">Not the trash folder.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                            <Link
                                to="/optimize"
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-black text-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform glow-violet relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-white/20 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                                Tailor My Resume <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a
                                href="#how-it-works"
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass border border-white/10 text-white font-bold text-lg hover:bg-white/5 transition-colors"
                            >
                                See How It Works
                            </a>
                        </div>

                        {/* HERO VISUAL: UI MOCKUP */}
                        <div className="relative max-w-5xl mx-auto animate-float">
                            {/* Decorative Glow behind the card */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 blur-3xl opacity-50" />

                            <div className="relative glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                                {/* Window Controls */}
                                <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                        <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                    </div>
                                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">TailorDoc Dashboard v1.0</div>
                                    <div className="w-10" />
                                </div>

                                <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
                                    {/* Left: Your Resume */}
                                    <div className="md:col-span-4 bg-white/5 rounded-2xl p-6 border border-white/5 relative group overflow-hidden">
                                        <div className="flex items-center gap-3 mb-6">
                                            <FileText className="w-5 h-5 text-slate-400" />
                                            <span className="text-sm font-bold text-slate-200">Standard Resume.pdf</span>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-2 w-full bg-white/10 rounded-full" />
                                            <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                                            <div className="h-2 w-5/6 bg-white/10 rounded-full" />
                                            <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                                            <div className="h-2 w-full bg-white/10 rounded-full opacity-50" />
                                            <div className="h-2 w-2/3 bg-white/10 rounded-full opacity-50" />
                                        </div>
                                        <div className="mt-8 flex justify-center">
                                            <div className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-wider border border-red-500/20">
                                                ATS Score: 42%
                                            </div>
                                        </div>
                                    </div>

                                    {/* Middle: AI Processing */}
                                    <div className="md:col-span-3 flex flex-col items-center justify-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-violet-600/10 flex items-center justify-center relative shadow-[0_0_50px_rgba(139,92,246,0.2)]">
                                            <div className="absolute inset-0 rounded-full border border-violet-500/50 animate-ping" />
                                            <Sparkles className="w-8 h-8 text-violet-500" />
                                        </div>
                                        <div className="text-xs font-black uppercase tracking-[0.3em] text-violet-400 animate-pulse">
                                            AI Processing...
                                        </div>
                                    </div>

                                    {/* Right: Optimized Resume */}
                                    <div className="md:col-span-4 bg-violet-600/5 rounded-2xl p-6 border border-violet-500/20 relative">
                                        <div className="flex items-center gap-3 mb-6">
                                            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                                            <span className="text-sm font-bold text-white">Optimized_Final.pdf</span>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-2 w-full bg-violet-500/30 rounded-full overflow-hidden relative">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                                            </div>
                                            <div className="h-2 w-full bg-violet-500/30 rounded-full" />
                                            <div className="h-2 w-5/6 bg-cyan-500/40 rounded-full" />
                                            <div className="h-2 w-4/5 bg-violet-500/30 rounded-full" />
                                            <div className="flex gap-2">
                                                <div className="h-2 w-1/3 bg-cyan-500/40 rounded-full" />
                                                <div className="h-2 w-1/4 bg-violet-500/30 rounded-full" />
                                            </div>
                                            <div className="h-2 w-11/12 bg-cyan-500/40 rounded-full" />
                                        </div>
                                        <div className="mt-8 flex justify-center">
                                            <div className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider border border-cyan-500/30 glow-cyan">
                                                ATS Score: 98%
                                            </div>
                                        </div>
                                        {/* Floating Keyword Tags */}
                                        <div className="absolute -top-4 -right-4 px-3 py-1 rounded-full bg-cyan-500 text-black text-[10px] font-black uppercase animate-bounce">
                                            + Keywords Match
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 text-slate-500 text-sm font-medium flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                            <span>Trusted by 12,000+ job seekers</span>
                            <span className="w-1 h-1 rounded-full bg-slate-700 hidden sm:block" />
                            <span>94% ATS pass rate</span>
                            <span className="w-1 h-1 rounded-full bg-slate-700 hidden sm:block" />
                            <span>3x more callbacks</span>
                        </div>
                    </div>
                </section>

                {/* SECTION: PROBLEM SECTION */}
                <section className="py-24 px-6 bg-grid-dots relative border-y border-white/5">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">
                                The Resume Black Hole Is Real.
                            </h2>
                            <p className="text-slate-400 max-w-xl mx-auto italic text-lg">
                                "You're qualified. You're just not optimized. Yet."
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { val: "75%", label: "of resumes are rejected by ATS before a human ever reads them." },
                                { val: "6 Seconds", label: "Average time a recruiter spends on a resume that makes it through." },
                                { val: "250+", label: "Average applicants competing for a single job posting." }
                            ].map((stat, idx) => (
                                <div key={idx} className="glass p-10 rounded-3xl text-center glass-hover group">
                                    <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-4 group-hover:scale-110 transition-transform duration-500">
                                        {stat.val}
                                    </div>
                                    <p className="text-slate-400 font-medium leading-relaxed">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION: HOW IT WORKS */}
                <section id="how-it-works" className="py-24 px-6 relative overflow-hidden">
                    <div className="container mx-auto">
                        <div className="text-center mb-20 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl md:text-[12rem] font-black text-white/[0.03] select-none uppercase tracking-widest whitespace-nowrap">
                                Process
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white relative z-10">
                                From Invisible to Irresistible. <br className="hidden md:block" /> In 3 Steps.
                            </h2>
                        </div>

                        <div className="relative flex flex-col md:flex-row items-start justify-between gap-12 md:gap-6">
                            {/* Connecting Dashed Line (Desktop Only) */}
                            <div className="hidden md:block absolute top-20 left-[10%] right-[10%] border-t-2 border-dashed border-white/10 -z-10" />

                            {[
                                { step: "01", icon: <Upload />, title: "Upload Your Resume", desc: "Drop your PDF or DOCX. We handle the parsing." },
                                { step: "02", icon: <ClipboardList />, title: "Paste the Job Description", desc: "Copy the JD from any job board. That's it." },
                                { step: "03", icon: <Download />, title: "Download Your Tailored Resume", desc: "Get a clean, ATS-ready PDF in under 30 seconds." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex-1 text-center md:text-left relative">
                                    <div className="absolute -top-12 md:-left-4 text-7xl font-black text-white/[0.05] -z-10">{item.step}</div>
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 p-0.5 mb-6 mx-auto md:mx-0 shadow-lg glow-violet">
                                        <div className="w-full h-full bg-[#0a0a0f] rounded-[14px] flex items-center justify-center text-violet-400">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-3">{item.title}</h3>
                                    <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION: FEATURES */}
                <section id="features" className="py-24 px-6 bg-grid-lines relative border-t border-white/5">
                    <div className="container mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">Built Different.</h2>
                            <div className="h-1 w-24 bg-gradient-to-r from-violet-600 to-cyan-500 mx-auto rounded-full" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { icon: <Cpu />, title: "AI Ghostwriting", desc: "Bullet points rewritten by Llama 3.3 70B. Not templates. Real intelligence." },
                                { icon: <Zap />, title: "Groq-Powered Speed", desc: "Near-instant inference. Your resume is ready before your coffee cools." },
                                { icon: <Target />, title: "ATS Laser-Targeting", desc: "Keywords extracted from the JD and woven into your resume naturally." },
                                { icon: <Lock />, title: "Privacy-First Mode", desc: "Toggle to hide contact info for blind screenings. Your data, your rules." },
                                { icon: <FileText />, title: "Clean PDF Export", desc: "Beautifully formatted output. No weird fonts. No broken layouts." },
                                { icon: <BrainCircuit />, title: "Keeps You Honest", desc: "We reframe your experience. We don't fabricate it." }
                            ].map((feature, idx) => (
                                <div key={idx} className="glass p-8 rounded-3xl glass-hover group">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-violet-400 mb-6 group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
                                    <p className="text-slate-400 text-sm font-medium leading-[1.6]">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION: TESTIMONIALS */}
                <section className="py-24 px-6 relative">
                    <div className="container mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">Real People. Real Callbacks.</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { name: "Maya R.", role: "Software Engineer", quote: "I applied to 40 jobs with my old resume. Zero callbacks. Used TailorDoc once and got 3 interviews in a week. It's unreal." },
                                { name: "James T.", role: "Product Manager", quote: "The ATS score on my LinkedIn went from 52% to 91% after one pass. Worth every penny." },
                                { name: "Priya K.", role: "Data Analyst", quote: "I was skeptical. Then I got a call from Google. Now I'm not skeptical." }
                            ].map((testi, idx) => (
                                <div key={idx} className="glass p-8 rounded-3xl flex flex-col justify-between">
                                    <div>
                                        <div className="flex gap-1 mb-6 text-amber-400">
                                            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                        </div>
                                        <p className="text-slate-300 italic mb-8 leading-relaxed font-medium">"{testi.quote}"</p>
                                    </div>
                                    <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-xs font-black text-white">
                                            {testi.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-white">{testi.name}</div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{testi.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION: FINAL CTA */}
                <section className="py-24 px-6 md:py-40 relative">
                    <div className="container mx-auto max-w-5xl">
                        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-violet-900 via-indigo-950 to-black p-10 md:p-24 border border-violet-500/30 text-center">
                            {/* Internal Glows */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-radial-gradient from-violet-600/20 to-transparent pointer-events-none" />

                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
                                    Your Next Job Is <br className="hidden md:block" /> One Resume Away.
                                </h2>
                                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium">
                                    Join thousands of job seekers who stopped applying blindly and started getting noticed.
                                </p>
                                <Link
                                    to="/optimize"
                                    className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl bg-white text-[#0a0a0f] text-xl font-black hover:scale-105 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.3)]"
                                >
                                    Tailor My Resume for Free <ArrowRight />
                                </Link>
                                <div className="mt-8 text-slate-500 text-sm font-bold uppercase tracking-widest">
                                    No credit card required · Takes 60 seconds
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* SECTION: FOOTER */}
            <footer className="py-20 px-6 border-t border-white/5">
                <div className="container mx-auto">

                    <div className="pt-10 border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-bold text-slate-600 uppercase tracking-widest">
                        <div>© 2025 TailorDoc. Built with ❤️ and Llama 3.3.</div>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-slate-400">System Status</a>
                            <a href="#" className="hover:text-slate-400">Security</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
