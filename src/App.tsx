import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, RefreshCcw, Terminal, ShieldAlert, LayoutGrid, User, Settings, Calendar, FileText, Share2, Info, Activity, Cpu, Database, ArrowLeft } from 'lucide-react';
import { translations, uiStrings, Language, ErrorInfo } from './translations';

export default function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [errorCode, setErrorCode] = useState<string>('404');
  const [errorData, setErrorData] = useState<ErrorInfo>(translations['404']['zh']);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(70);
  
  const [returnUrl, setReturnUrl] = useState('/');
  const [retryUrl, setRetryUrl] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code') || '404';
    const l = (params.get('lang') as Language) || 'zh';
    
    const fromParam = params.get('from');
    const homeParam = params.get('home');
    const referrer = document.referrer;

    const targetRetry = fromParam || referrer;
    setRetryUrl(targetRetry || '');

    if (homeParam) {
      setReturnUrl(homeParam);
    } else if (targetRetry) {
      try {
        const url = new URL(targetRetry);
        setReturnUrl(url.origin);
      } catch {
        setReturnUrl('/');
      }
    }

    setErrorCode(code);
    setLang(l);
    
    const currentError = translations[code] || translations['default'];
    setErrorData(currentError[l] || currentError['zh']);
    
    setIsReady(true);

    const interval = setInterval(() => {
      setProgress(prev => (prev >= 99 ? 70 : prev + Math.random() * 0.5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    const currentError = translations[errorCode] || translations['default'];
    setErrorData(currentError[newLang] || currentError['zh']);
    
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    window.history.pushState({}, '', url);
  };

  const handleRetry = () => {
    if (retryUrl) {
      window.location.href = retryUrl;
    } else {
      window.location.reload();
    }
  };

  const handleReturn = () => {
    window.location.href = returnUrl;
  };

  if (!isReady) return null;

  return (
    <div className="relative min-h-screen w-full flex bg-endfield-bg text-white font-sans overflow-hidden selection:bg-endfield-yellow selection:text-black">
      {/* Background Layers */}
      <div className="absolute inset-0 topo-bg opacity-20 pointer-events-none" />
      <div className="absolute inset-0 noise-bg pointer-events-none" />
      <div className="absolute inset-0 scanline-overlay pointer-events-none" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -100],
              opacity: [0, 0.3, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 10, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-white rotate-45"
          />
        ))}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10">
        {/* Top Header Section */}
        <header className="h-40 md:h-48 flex items-center px-8 md:px-16 border-b border-white/10 bg-black/40 backdrop-blur-md relative overflow-hidden">
          {/* Header Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-endfield-yellow/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5" />
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-12 h-12 bg-white flex items-center justify-center rotate-45 group hover:rotate-0 transition-transform duration-500">
                <div className="w-8 h-8 bg-black -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-endfield-yellow" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-endfield-yellow" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-endfield-yellow tracking-[0.5em] mb-1">PROTOCOL: ERROR_REPORT</span>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[60px] md:text-[100px] font-black tracking-tighter leading-none flex items-center gap-4"
              >
                <span className="text-white/10">//</span>
                <span>ERROR</span>
                <span className="text-endfield-yellow animate-pulse">.</span>
              </motion.h1>
            </div>
          </div>
          
          <div className="ml-auto flex items-center gap-6">
            <div className="hidden lg:flex flex-col items-end gap-1 mr-8">
              <div className="flex gap-1">
                <Activity className="w-3 h-3 text-endfield-yellow animate-pulse" />
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Signal: Fluctuating</span>
              </div>
              <div className="flex gap-1">
                <Cpu className="w-3 h-3 text-white/40" />
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Core: Overload</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {(['zh', 'en', 'jp'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => changeLanguage(l)}
                  className={`px-3 py-1 text-[11px] font-mono font-bold transition-all relative ${
                    lang === l 
                      ? 'text-endfield-yellow' 
                      : 'text-white/30 hover:text-white'
                  }`}
                >
                  {l.toUpperCase()}
                  {lang === l && (
                    <motion.div 
                      layoutId="langUnderline"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-endfield-yellow"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Sub-header status bar */}
        <div className="h-10 bg-white/[0.02] border-b border-white/5 flex items-center px-8 md:px-16 gap-8 overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-endfield-yellow rotate-45" />
            <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.3em]">System Status: Critical</span>
          </div>
          <div className="flex items-center gap-4 flex-1">
            <div className="h-[1px] flex-1 bg-white/5" />
            <div className="flex gap-1">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`w-1 h-3 ${i < 12 ? 'bg-endfield-yellow/20' : 'bg-white/5'}`} />
              ))}
            </div>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.3em]">Node: {Math.random().toString(16).slice(2, 6).toUpperCase()}</span>
            <div className="w-1.5 h-1.5 bg-white/20 rotate-45" />
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col md:flex-row relative">
          {/* Main Content Brackets */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-white/5" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-white/5" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-white/5" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-white/5" />
          </div>

          {/* Left Panel: Error Code & Status */}
          <div className="w-full md:w-[40%] p-8 md:p-16 flex flex-col gap-10 border-r border-white/10 bg-black/30 backdrop-blur-sm relative">
            {/* Corner Brackets */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/10" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/10" />
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[11px] font-mono text-endfield-yellow">
                <motion.span 
                  animate={{ rotate: [0, 90, 180, 270, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >↘</motion.span>
                <span className="tracking-[0.2em]">SYSTEM_PROTOCOL_ANOMALY</span>
              </div>
              <div className="relative">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={errorData.title}
                  className="text-4xl md:text-5xl font-black leading-tight uppercase"
                >
                  {errorData.title}
                </motion.h2>
                <div className="absolute -left-4 top-0 w-1 h-full bg-endfield-yellow/40" />
              </div>
            </div>

            <div className="flex items-center gap-6 relative">
              <div className="absolute -top-4 -left-4 text-[8px] font-mono text-white/20">ID: {Math.random().toString(36).substring(7).toUpperCase()}</div>
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-8xl md:text-[120px] font-black text-endfield-yellow drop-shadow-[0_0_20px_rgba(226,255,0,0.3)]"
              >
                {errorCode}
              </motion.div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">Status Code</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-endfield-yellow animate-ping" />
                  <span className="text-sm font-bold tracking-widest">CRITICAL_FAILURE</span>
                </div>
              </div>
            </div>

            <div className="mt-auto space-y-8">
              {/* Mission Status Box */}
              <div className="p-4 border border-white/10 bg-white/[0.03] space-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-endfield-yellow" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Mission Status</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-endfield-yellow" />
                    <div className="w-1 h-1 bg-white/20" />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-endfield-yellow tracking-tighter">
                        {progress.toFixed(0)}
                      </span>
                      <span className="text-sm font-bold text-endfield-yellow/60">%</span>
                    </div>
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.4em]">
                      Syncing_Data...
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex gap-1">
                      <motion.div 
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-endfield-yellow" 
                      />
                      <div className="w-1.5 h-1.5 bg-endfield-yellow" />
                    </div>
                    <span className="text-[8px] font-mono text-white/20">SEC: 0{Math.floor(progress/10)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-1.5">
                {[...Array(8)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    className={`w-6 h-1 ${i === 0 ? 'bg-endfield-yellow' : 'bg-white/10'}`} 
                  />
                ))}
              </div>
              <div className="text-[10px] font-mono text-white/20 leading-relaxed tracking-widest relative">
                <div className="absolute -left-4 top-0 w-[1px] h-full bg-white/5" />
                <div className="flex items-center gap-2">
                  <Database className="w-3 h-3" />
                  <span>PAYLOAD // [0x{Math.random().toString(16).slice(2, 6).toUpperCase()}]</span>
                </div>
                <div className="flex items-center gap-2">
                  <Terminal className="w-3 h-3" />
                  <span>SYSTEM INTERFACES // V4.2.0</span>
                </div>
                <div className="mt-2 text-endfield-yellow/40 flex items-center gap-2">
                  <span className="w-1 h-1 bg-endfield-yellow/40 rotate-45" />
                  ENDFIELD_OS_KERNEL_PANIC: 0x{Math.random().toString(16).slice(2, 10).toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Description & Actions */}
          <div className="flex-1 p-8 md:p-16 flex flex-col relative bg-black/5">
            {/* Yellow Accent Bar with Scrolling Text */}
            <div className="absolute top-0 right-0 w-20 md:w-24 h-full bg-endfield-yellow overflow-hidden flex flex-col items-center">
              <div className="marquee-vertical flex flex-col gap-8 py-8">
                {[...Array(10)].map((_, i) => (
                  <span key={i} className="vertical-text text-black font-black text-4xl tracking-[0.5em] uppercase opacity-80">
                    ERROR
                  </span>
                ))}
                {[...Array(10)].map((_, i) => (
                  <span key={i + 10} className="vertical-text text-black font-black text-4xl tracking-[0.5em] uppercase opacity-80">
                    ERROR
                  </span>
                ))}
              </div>
            </div>

            <div className="max-w-2xl space-y-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={errorData.message}
                className="space-y-6"
              >
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
                  {errorData.message}
                </p>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  className="h-1.5 bg-endfield-yellow" 
                />
              </motion.div>

              <div className="space-y-4 p-6 border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[11px] font-mono text-endfield-yellow font-bold uppercase tracking-[0.3em]">
                  <span className="animate-pulse">●</span>
                  <span>System Suggestion</span>
                </div>
                <p className="text-white/60 italic leading-relaxed">
                  {errorData.suggestion}
                </p>
              </div>

              {/* System Log Module */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-1">
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em]">System_Log_Stream</span>
                  <span className="text-[9px] font-mono text-endfield-yellow/60 uppercase tracking-[0.2em]">Live</span>
                </div>
                <div className="space-y-1 font-mono text-[8px] text-white/20 uppercase tracking-widest leading-tight">
                  <div className="flex gap-4">
                    <span className="text-endfield-yellow/40">[07:27:07]</span>
                    <span>Initializing_Kernel_Handshake...</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-endfield-yellow/40">[07:27:08]</span>
                    <span className="text-white/40">Warning: Buffer_Overflow_Detected</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-endfield-yellow/40">[07:27:09]</span>
                    <span className="text-endfield-yellow/60">Critical: Protocol_Mismatch_0x404</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-endfield-yellow/40">[07:27:10]</span>
                    <span>Redirecting_To_Safe_Interface...</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                <button 
                  onClick={handleReturn}
                  className="group relative flex items-center gap-4 px-10 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all hover:pr-12"
                >
                  <div className="absolute inset-0 bg-endfield-yellow translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                  <span className="relative z-10 flex items-center gap-4">
                    <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {uiStrings.backToHome[lang]}
                  </span>
                </button>
                <button 
                  onClick={handleRetry}
                  className="group flex items-center gap-4 px-10 py-5 border border-white/20 text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10 transition-all"
                >
                  <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  {retryUrl ? 'Retry Source' : 'Retry'}
                </button>
              </div>
              
              {retryUrl && (
                <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
                  Source: {retryUrl.length > 50 ? retryUrl.substring(0, 47) + '...' : retryUrl}
                </div>
              )}
            </div>

            {/* Decorative Grid Dots */}
            <div className="mt-auto grid grid-cols-8 gap-3 w-fit opacity-30">
              {[...Array(24)].map((_, i) => (
                <motion.div 
                  key={i} 
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
                  className="w-1 h-1 bg-white" 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <footer className="h-16 px-8 md:px-16 border-t border-white/10 flex items-center justify-between bg-black/60 backdrop-blur-md">
          <div className="flex items-center gap-12 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-endfield-yellow animate-pulse" />
              <span>Over the frontier / Into the front</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <Activity className="w-3 h-3" />
              <span>Sync: {progress.toFixed(1)}%</span>
            </div>
            <div className="hidden md:block">
              COORD: {Math.random().toFixed(4)}, {Math.random().toFixed(4)}
            </div>
          </div>
          <div className="text-[10px] font-mono text-white/20 tracking-widest">
            © 2026 GRYPHLINE. ALL RIGHTS RESERVED.
          </div>
        </footer>
      </main>

      {/* Side Decorations */}
      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-4 opacity-20">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-white rotate-45" />
        ))}
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20" />
    </div>
  );
}
