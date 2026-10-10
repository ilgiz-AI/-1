/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/Hero';
import Services from './components/Services';
import Booking from './components/Booking';
import Team from './components/Team';
import MapSection from './components/MapSection';
import ChatBot from './components/ChatBot';
import StyleAI from './components/StyleAI';
import { motion, useScroll, useSpring } from 'motion/react';
import { LanguageProvider, useLanguage } from './lib/LanguageContext';
import { cn } from './lib/utils';
import { Globe } from 'lucide-react';

function AppContent() {
  const { scrollYProgress } = useScroll();
  const { t, language, setLanguage } = useLanguage();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative selection:bg-gold selection:text-black">
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation - Minimal and Floating */}
      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 mix-blend-difference">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="text-xl font-display font-bold uppercase tracking-[0.2em] italic">
            Aristocrat<span className="text-gold">.</span>
          </a>
          
          <div className="hidden md:flex gap-8 items-center font-bold uppercase text-[10px] tracking-[0.4em]">
            <a href="#services" className="hover:text-gold transition-colors text-white">{t.nav.services}</a>
            <a href="#team" className="hover:text-gold transition-colors text-white">{t.nav.masters}</a>
            <a href="#booking" className="hover:text-gold transition-colors text-white">{t.nav.booking}</a>
            
            {/* Language Switcher */}
            <div className="flex gap-3 border-l border-white/20 pl-8 ml-4">
               {(['ru', 'en', 'ky'] as const).map((lang) => (
                 <button 
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={cn(
                    "hover:text-gold transition-colors text-white cursor-pointer",
                    language === lang && "text-gold"
                  )}
                 >
                   {lang.toUpperCase()}
                 </button>
               ))}
            </div>
          </div>
          
          <div className="md:hidden flex items-center gap-4">
             <button 
                onClick={() => setLanguage(language === 'ru' ? 'en' : language === 'en' ? 'ky' : 'ru')}
                className="text-[10px] font-bold uppercase tracking-widest text-white border border-white/20 px-2 py-1 rounded"
             >
               {language.toUpperCase()}
             </button>
             <a href="#booking" className="text-[10px] font-bold uppercase tracking-widest text-gold text-white">{t.nav.bookNow}</a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <Hero />
      <Services />
      <StyleAI />
      <Team />
      <Booking />
      <MapSection />
      <ChatBot />

      {/* Footer */}
      <footer className="py-24 bg-black border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="space-y-8">
            <h3 className="text-2xl font-display uppercase italic tracking-tighter italic">Aristocrat Moscow</h3>
            <p className="text-zinc-500 text-sm font-light leading-relaxed">
               {language === 'ru' && "Мы создаем не просто стрижки, а образ жизни. Опыт, качество и внимание к деталям в каждом движении мастера."}
               {language === 'en' && "We create more than just haircuts, but a lifestyle. Experience, quality and attention to detail in every movement of the master."}
               {language === 'ky' && "Биз жөн гана чач жасалгасын эмес, жашоо образын түзөбүз. Ар бир чебердин кыймылында тажрыйба, сапат жана майда-чүйдөсүнө чейин көңүл бурулат."}
            </p>
          </div>
          <div className="space-y-4">
             <h4 className="text-[10px] uppercase font-bold text-gold tracking-[0.3em] mb-6">Socials</h4>
             <div className="flex gap-4">
                <a href="#" className="w-10 h-10 border border-zinc-800 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-all">Inst</a>
                <a href="#" className="w-10 h-10 border border-zinc-800 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-all">Tele</a>
                <a href="#" className="w-10 h-10 border border-zinc-800 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-all">Face</a>
             </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase font-bold text-gold tracking-[0.3em] mb-6">{language === 'ky' ? 'Байланыш' : language === 'en' ? 'Visit Us' : 'Контакты'}</h4>
            <p className="text-sm text-zinc-400">{t.hero.location === 'Moscow City' ? '12 Presnenskaya Nab., Moscow' : 'Пресненская наб. 12, Москва'}</p>
            <p className="text-sm text-zinc-400">+7 (495) 777-00-00</p>
            <p className="text-sm text-zinc-400">daily {t.hero.hours}</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-600 uppercase tracking-widest">
           <p>© 2026 Aristocrat Barbershop. All rights reserved.</p>
           <p>{language === 'ky' ? 'Өзгөчөлөр үчүн жасалган' : language === 'en' ? 'Made for the Exceptional' : 'Сделано для исключительных'}</p>
        </div>
      </footer>
    </main>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
