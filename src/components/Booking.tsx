
import { motion } from 'motion/react';
import { Calendar, Scissors, User } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { useLanguage } from '../lib/LanguageContext';

export default function Booking() {
  const [step, setStep] = useState(1);
  const { t } = useLanguage();
  
  const services = t.services.items;

  return (
    <section id="booking" className="py-24 bg-zinc-950 border-y border-zinc-900">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block"
          >
            {t.booking.reservation}
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display uppercase italic">{t.booking.title}</h2>
        </div>

        <div className="bg-black border border-zinc-800 p-8 md:p-12 rounded-2xl shadow-2xl">
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-800 -z-10" />
            {[1, 2, 3].map((s) => (
              <div 
                key={s}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                  step >= s ? "bg-gold border-gold text-black" : "bg-black border-zinc-800 text-zinc-500"
                )}
              >
                {s === 1 && <Scissors size={18} />}
                {s === 2 && <Calendar size={18} />}
                {s === 3 && <User size={18} />}
              </div>
            ))}
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-[300px]"
          >
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setStep(2)}
                    className="p-6 border border-zinc-800 hover:border-gold/50 text-left transition-all group bg-zinc-900/30 rounded-xl"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-lg tracking-tight group-hover:text-gold transition-colors">{item.title}</span>
                      <span className="text-gold font-mono text-sm">{item.price}</span>
                    </div>
                    <span className="text-zinc-500 text-xs uppercase tracking-wider">{item.desc.split(',')[0]}</span>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-xs uppercase tracking-widest text-zinc-500">{t.booking.selectDate}</label>
                    <input type="date" className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl focus:border-gold outline-none transition-colors" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs uppercase tracking-widest text-zinc-500">{t.booking.selectTime}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'].map(t => (
                        <button key={t} className="p-3 border border-zinc-800 hover:border-gold rounded-lg transition-colors text-sm">{t}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <button onClick={() => setStep(3)} className="w-full py-4 bg-gold text-black font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-colors">{t.booking.next}</button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input placeholder={t.booking.name} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl focus:border-gold outline-none" />
                  <input placeholder={t.booking.phone} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl focus:border-gold outline-none" />
                </div>
                <textarea placeholder={t.booking.notes} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl focus:border-gold outline-none min-h-[120px]" />
                <button onClick={() => alert(t.booking.success)} className="w-full py-4 bg-gold text-black font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-colors">{t.booking.confirm}</button>
              </div>
            )}
          </motion.div>
          
          {step > 1 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="mt-8 text-zinc-500 hover:text-white transition-colors text-sm flex items-center gap-2"
            >
              ← {t.booking.back}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
