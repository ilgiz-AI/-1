
import { motion } from 'motion/react';
import { Star, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2070" 
          alt="Barbershop Atmosphere" 
          className="w-full h-full object-cover opacity-40 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-[1px] bg-gold w-24 mb-8 origin-left"
            />
            <h1 className="text-7xl md:text-9xl font-display leading-[0.85] uppercase mb-6 italic tracking-tighter">
              Aristocrat <br />
              <span className="text-stroke-white">Moscow</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-md font-light leading-relaxed mb-10">
              {t.hero.tagline}
            </p>
            
            <div className="flex flex-wrap gap-6">
              <motion.a 
                href="#booking"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gold text-black font-bold uppercase tracking-widest rounded-sm hover:bg-white transition-colors"
              >
                {t.hero.book}
              </motion.a>
              <motion.a 
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-zinc-700 font-bold uppercase tracking-widest rounded-sm hover:border-white transition-colors"
              >
                {t.hero.catalog}
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative aspect-[3/4] w-[400px] ml-auto">
              <img 
                src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=2070" 
                alt="Modern Barber"
                className="w-full h-full object-cover rounded-2xl shadow-2xl border border-zinc-800"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -left-10 bg-black p-8 border border-zinc-800 rounded-xl shadow-2xl">
                <div className="flex gap-1 mb-2 text-gold">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-sm font-medium mb-1">5.0 {t.hero.rating}</p>
                <p className="text-xs text-zinc-500 uppercase tracking-widest text-nowrap">{t.hero.reviews}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Info */}
      <div className="absolute bottom-10 left-6 right-6 hidden md:flex justify-between items-end">
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">
            <Instagram size={16} className="cursor-pointer hover:text-gold" />
            <Facebook size={16} className="cursor-pointer hover:text-gold" />
            <span className="h-[1px] w-12 bg-zinc-800" />
            <span>Founders in Moscow</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-12 text-zinc-500">
           <div className="space-y-1">
              <span className="block text-[10px] uppercase font-bold text-gold/60 tracking-widest">Location</span>
              <span className="block text-sm text-zinc-300">{t.hero.location}</span>
           </div>
           <div className="space-y-1">
              <span className="block text-[10px] uppercase font-bold text-gold/60 tracking-widest">Phone</span>
              <span className="block text-sm text-zinc-300">+7 (495) 777-00-00</span>
           </div>
           <div className="space-y-1 text-right">
              <span className="block text-[10px] uppercase font-bold text-gold/60 tracking-widest">Hours</span>
              <span className="block text-sm text-zinc-300">{t.hero.hours}</span>
           </div>
        </div>
      </div>
    </section>
  );
}
