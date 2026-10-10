
import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xs uppercase tracking-[.4em] text-gold mb-6 block"
            >
              {t.services.menu}
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter leading-none italic">
              {t.services.title} <span className="text-stroke-white text-6xl md:text-8xl">{t.services.accent}</span>
            </h2>
          </div>
          <p className="text-zinc-500 max-w-xs text-sm leading-relaxed text-right uppercase tracking-wider font-light">
            {t.services.products}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
          {t.services.items.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-black p-12 hover:bg-zinc-950 transition-colors group cursor-default relative overflow-hidden"
            >
              <div className="relative z-10">
                <span className="text-[10px] font-mono text-zinc-700 mb-8 block group-hover:text-gold transition-colors">0{i+1}</span>
                <div className="flex justify-between items-baseline mb-4">
                  <h3 className="text-2xl font-display uppercase italic tracking-tighter group-hover:text-gold transition-colors">{s.title}</h3>
                  <span className="text-sm font-mono text-gold whitespace-nowrap">{s.price}</span>
                </div>
                <p className="text-zinc-500 text-sm font-light leading-relaxed mb-6 group-hover:text-zinc-400 transition-colors">
                  {s.desc}
                </p>
                <div className="h-[1px] w-0 group-hover:w-full bg-gold transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
