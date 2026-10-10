
import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';

export default function Team() {
  const { t, language } = useLanguage();
  
  const masters = [
    { name: "Александр Гром", nameEn: "Alexander Grom", nameKy: "Александр Гром", role: t.team.role, exp: `8 ${t.team.exp}`, img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=1974" },
    { name: "Марк Рихтер", nameEn: "Mark Richter", nameKy: "Марк Рихтер", role: "Senior Barber", exp: `6 ${t.team.exp}`, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974" },
    { name: "Давид Мастер", nameEn: "David Master", nameKy: "Давид Мастер", role: "Master", exp: `5 ${t.team.exp}`, img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1974" },
  ];

  return (
    <section id="team" className="py-32 bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-display uppercase italic tracking-tighter"
          >
            {t.team.title} <span className="text-stroke-white">{t.team.accent}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {masters.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="relative group lg:pt-12"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-zinc-800">
                <img 
                  src={m.img} 
                  alt={language === 'en' ? m.nameEn : language === 'ky' ? m.nameKy : m.name} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                   <h3 className="text-2xl font-display uppercase italic mb-1">
                      {language === 'en' ? m.nameEn : language === 'ky' ? m.nameKy : m.name}
                   </h3>
                   <div className="flex items-center gap-3">
                      <span className="text-xs uppercase tracking-widest text-gold font-bold">{m.role}</span>
                      <span className="h-[1px] w-4 bg-zinc-500" />
                      <span className="text-xs text-zinc-400 uppercase tracking-wider">{m.exp}</span>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
