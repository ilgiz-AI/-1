
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, RefreshCw, CheckCircle2, Sparkles, Loader2, Video, VideoOff } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../lib/LanguageContext';
import { cn } from '../lib/utils';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function StyleAI() {
  const { t, language } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayScale, setOverlayScale] = useState(1);
  const [isLive, setIsLive] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsLive(true);
        setImage(null);
        setError(null);
        setShowOverlay(true);
        setShowVideo(false);
      }
    } catch (err) {
      console.error("Camera error:", err);
      setError(t.style.cameraError);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsLive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImage(dataUrl);
        stopCamera();
        analyzeStyle(dataUrl);
      }
    }
  };

  const stylePresets = [
    { 
      id: 'classic', 
      label: t.style.styles.classic, 
      img: 'https://images.unsplash.com/photo-1593702288056-7927b442d0fa?auto=format&fit=crop&q=80&w=200&h=200',
      video: 'https://cdn.pixabay.com/video/2016/09/16/5144-183617300_large.mp4',
      svg: (
        <path d="M20,80 Q50,20 80,80 Q85,110 50,110 Q15,110 20,80 Z" fill="currentColor" opacity="0.8" />
      )
    },
    { 
      id: 'fade', 
      label: t.style.styles.fade, 
      img: 'https://images.unsplash.com/photo-1592647420148-bfcc1a3ed291?auto=format&fit=crop&q=80&w=200&h=200',
      video: 'https://cdn.pixabay.com/video/2021/08/21/85863-591557008_large.mp4',
      svg: (
        <path d="M25,75 Q50,25 75,75 Q75,90 50,90 Q25,90 25,75 Z" fill="currentColor" opacity="0.8" />
      )
    },
    { 
      id: 'long', 
      label: t.style.styles.long, 
      img: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=200&h=200',
      video: 'https://cdn.pixabay.com/video/2020/07/07/44052-438994503_large.mp4',
      svg: (
        <path d="M15,80 Q50,10 85,80 Q90,140 50,140 Q10,140 15,80 Z" fill="currentColor" opacity="0.8" />
      )
    },
    { 
      id: 'top', 
      label: t.style.styles.top, 
      img: 'https://images.unsplash.com/photo-1583195713938-cd216ecd992e?auto=format&fit=crop&q=80&w=200&h=200',
      video: 'https://cdn.pixabay.com/video/2021/08/04/83917-584742886_large.mp4',
      svg: (
        <g fill="currentColor" opacity="0.8">
          <path d="M30,85 Q50,45 70,85 Q70,100 50,100 Q30,100 30,85 Z" />
          <circle cx="50" cy="40" r="12" />
        </g>
      )
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setSuggestion(null);
        setShowOverlay(false);
        setShowVideo(false);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeStyle = async (imageInput?: string) => {
    const currentImage = imageInput || image;
    if (!currentImage) return;
    setIsAnalyzing(true);

    try {
      const imageData = currentImage.split(',')[1];
      const mimeType = currentImage.split(';')[0].split(':')[1];
      
      const styleName = selectedStyle ? stylePresets.find(s => s.id === selectedStyle)?.label : 'any professional style';

      const prompt = `
        Analyze this person's face shape and hair structure. 
        As a professional top barber from "Aristocrat Moscow", provide a detailed technical critique of how the "${styleName}" haircut would look on them.
        
        Guidelines:
        1. Identify their face shape (oval, square, etc.).
        2. Explain if the ${styleName} style highlights their best features or if adjustments are needed.
        3. Give a final verdict.
        
        Provide a sophisticated and elite response in ${language === 'en' ? 'English' : language === 'ky' ? 'Kyrgyz' : 'Russian'}. 
        Keep it under 4 sentences.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { text: prompt },
          {
            inlineData: {
              data: imageData,
              mimeType: mimeType
            }
          }
        ]
      });

      const text = response.text || (language === 'en' ? "Your face shape is perfect for this style." : "Ваша форма лица идеально подходит для этого стиля.");
      setSuggestion(text);
      setShowOverlay(true);
      
      // Delay to simulate "video rendering"
      setTimeout(() => {
        setShowVideo(true);
      }, 1500);

    } catch (error) {
      console.error("AI Analysis Error:", error);
      setSuggestion(language === 'en' ? "Your face shape is perfect for a classic high-fade Aristocrat cut." : "Ваша форма лица идеально подходит для классической стрижки Aristocrat с плавным переходом.");
      setShowOverlay(true);
      setTimeout(() => setShowVideo(true), 1500);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const currentStyle = stylePresets.find(s => s.id === selectedStyle);
  const currentStyleSvg = currentStyle?.svg;

  return (
    <section id="style-ai" className="py-32 bg-black overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs uppercase tracking-[0.4em] text-gold mb-6 block font-bold">
              {t.style.title}
            </span>
            <h2 className="text-5xl md:text-7xl font-display uppercase italic tracking-tighter mb-8 text-white">
              {t.style.accent} <span className="text-stroke-white underline decoration-gold/30">Your Look</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed mb-12 max-w-md">
              {t.style.desc}
            </p>

            <div className="space-y-8">
               <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-zinc-400 font-bold">{t.style.selectStyle}</h4>
                  <div className="grid grid-cols-4 gap-4">
                     {stylePresets.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => {
                            setSelectedStyle(style.id);
                            setSuggestion(null);
                            setShowOverlay(false);
                            setShowVideo(false);
                          }}
                          className={cn(
                            "relative group aspect-square rounded-xl overflow-hidden border-2 transition-all",
                            selectedStyle === style.id ? "border-gold" : "border-zinc-800 grayscale hover:grayscale-0 hover:border-zinc-600"
                          )}
                        >
                           <img src={style.img} className="w-full h-full object-cover" alt={style.label} />
                           {selectedStyle === style.id && (
                             <div className="absolute top-1 right-1">
                               <CheckCircle2 size={12} className="text-gold fill-black" />
                             </div>
                           )}
                        </button>
                     ))}
                  </div>
               </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 text-zinc-400 group cursor-default">
                  <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-gold transition-colors">
                      <Sparkles size={16} className="text-zinc-600 group-hover:text-gold" />
                  </div>
                  <span className="text-sm uppercase tracking-widest">{language === 'en' ? 'Advanced Face Analysis' : 'Глубокий анализ лица'}</span>
                </div>
                <div className="flex items-center gap-4 text-zinc-400 group cursor-default">
                  <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-gold transition-colors">
                      <Video size={16} className="text-zinc-600 group-hover:text-gold" />
                  </div>
                  <span className="text-sm uppercase tracking-widest">{t.style.videoViz}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            {/* Visualizer Frame */}
            <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-3xl relative z-10">
              {/* Mode Toggles */}
              <div className="flex bg-black border border-zinc-900 rounded-xl p-1 mb-6">
                 <button 
                   onClick={() => { stopCamera(); setImage(null); setIsLive(false); setShowVideo(false); }}
                   className={cn(
                     "flex-1 py-2 text-[10px] uppercase tracking-widest font-bold rounded-lg transition-all",
                     !isLive ? "bg-zinc-900 text-gold" : "text-zinc-500 hover:text-zinc-300"
                   )}
                 >
                   {t.style.photoMode}
                 </button>
                 <button 
                    onClick={startCamera}
                    className={cn(
                      "flex-1 py-2 text-[10px] uppercase tracking-widest font-bold rounded-lg transition-all flex items-center justify-center gap-2",
                      isLive ? "bg-zinc-900 text-gold" : "text-zinc-500 hover:text-zinc-300"
                    )}
                  >
                    <Video size={12} />
                    {t.style.liveMode}
                  </button>
              </div>

              <div className="aspect-square w-full bg-black rounded-2xl border-2 border-zinc-800 flex flex-col items-center justify-center overflow-hidden relative group">
                <AnimatePresence mode="wait">
                  {showVideo && currentStyle?.video ? (
                    <motion.div 
                      key="video-viz"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-40 bg-black"
                    >
                       <video 
                         src={currentStyle.video} 
                         autoPlay 
                         loop 
                         muted 
                         playsInline
                         className="w-full h-full object-cover"
                       />
                       <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                          <p className="text-gold font-mono text-[10px] uppercase tracking-widest mb-1">{t.style.videoViz}</p>
                          <h4 className="text-white text-xl font-bold uppercase">{currentStyle.label}</h4>
                       </div>
                       <button 
                         onClick={() => setShowVideo(false)}
                         className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10 text-white hover:bg-gold hover:text-black transition-colors"
                       >
                         <RefreshCw size={16} />
                       </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="capture-viz"
                      className="w-full h-full flex items-center justify-center relative"
                    >
                      {isLive ? (
                        <video 
                          ref={videoRef} 
                          autoPlay 
                          playsInline 
                          muted 
                          className="w-full h-full object-cover scale-x-[-1]" 
                        />
                      ) : image ? (
                        <img src={image} className="w-full h-full object-cover" alt="User" />
                      ) : (
                        <div className="text-center p-12">
                          <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-600">
                             <Camera size={32} />
                          </div>
                          {error ? (
                            <p className="text-red-500 text-[10px] uppercase tracking-widest font-bold">{error}</p>
                          ) : (
                            <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">{t.style.upload}</p>
                          )}
                        </div>
                      )}

                      {showOverlay && currentStyleSvg && !isAnalyzing && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div 
                            drag
                            dragConstraints={{ top: -100, left: -100, right: 100, bottom: 100 }}
                            style={{ scale: overlayScale }}
                            className="w-48 h-48 cursor-move text-gold/60 mix-blend-overlay"
                          >
                              <svg viewBox="0 0 100 150" className="w-full h-full">
                                {currentStyleSvg}
                              </svg>
                          </motion.div>
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-800 flex items-center gap-4 z-50">
                              <button onClick={() => setOverlayScale(s => Math.max(0.5, s - 0.1))} className="text-zinc-500 hover:text-white">-</button>
                              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">{t.style.tryOn}</span>
                              <button onClick={() => setOverlayScale(s => Math.min(2, s + 0.1))} className="text-zinc-500 hover:text-white">+</button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload}
                />

                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-50">
                     <div className="relative">
                        <motion.div 
                           animate={{ rotate: 360 }}
                           transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                           className="w-20 h-20 border-t-2 border-gold rounded-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <Loader2 size={24} className="text-gold animate-pulse" />
                        </div>
                     </div>
                     <p className="mt-6 text-xs uppercase tracking-widest text-gold font-bold">{t.style.rendering}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 flex gap-4">
                {isLive ? (
                   <>
                    <button 
                      onClick={stopCamera}
                      className="flex-1 py-4 border border-zinc-800 text-zinc-400 font-bold uppercase tracking-widest rounded-xl hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <VideoOff size={18} /> {language === 'en' ? 'Stop' : 'Стоп'}
                    </button>
                    <button 
                      onClick={capturePhoto}
                      disabled={!selectedStyle}
                      className="flex-1 py-4 bg-gold text-black font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Camera size={18} /> {language === 'en' ? 'Capture' : 'Снять'}
                    </button>
                   </>
                ) : !image ? (
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 hover:bg-gold transition-colors"
                  >
                    <Upload size={18} /> {t.style.upload}
                  </button>
                ) : !suggestion ? (
                  <button 
                    onClick={() => analyzeStyle()}
                    disabled={isAnalyzing || !selectedStyle}
                    className="flex-1 py-4 bg-gold text-black font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 disabled:opacity-30 transition-all font-mono"
                  >
                    {isAnalyzing ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />} 
                    {language === 'en' ? 'Render Video' : 'Видео Визуализация'}
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setImage(null);
                      setSuggestion(null);
                      setShowOverlay(false);
                      setIsLive(false);
                      setShowVideo(false);
                    }}
                    className="flex-1 py-4 border border-zinc-800 text-white font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 hover:bg-zinc-900"
                  >
                    <RefreshCw size={18} /> {language === 'en' ? 'Reset' : 'Сброс'}
                  </button>
                )}
              </div>

              <AnimatePresence>
                {suggestion && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 pt-8 border-t border-zinc-800"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                        <Sparkles size={20} className="text-gold" />
                      </div>
                      <div>
                        <h4 className="text-gold font-mono text-xs uppercase tracking-widest">{t.style.result}</h4>
                        <p className="text-white font-bold uppercase">{selectedStyle ? stylePresets.find(s => s.id === selectedStyle)?.label : 'Style'}</p>
                      </div>
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed mb-8 italic">
                      "{suggestion}"
                    </p>
                    <button className="inline-block px-6 py-2 bg-zinc-900 text-gold text-[10px] font-bold uppercase tracking-widest rounded-full border border-gold/20 hover:bg-gold hover:text-black transition-all">
                      {t.style.cta}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Decorative backgrounds */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 blur-[100px] -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 blur-[100px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
