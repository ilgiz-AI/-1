import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { motion } from 'motion/react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export default function MapSection() {
  const center = { lat: 55.7485, lng: 37.5375 }; // Moscow City Area

  return (
    <section className="relative h-[500px] bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      <div className="absolute top-12 left-12 z-10 bg-black/80 backdrop-blur-md p-8 border border-zinc-800 rounded-xl max-w-sm">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4 block">Visit the Atelier</span>
          <h3 className="text-2xl font-display uppercase italic mb-4 tracking-tighter">Aristocrat <br/> Moscow City</h3>
          <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
            Расположены в самом сердце делового центра столицы. Удобная парковка и панорамный вид.
          </p>
          <div className="space-y-2">
            <p className="text-xs font-mono text-zinc-500">Пресненская наб. 12, Башня Федерация</p>
            <p className="text-xs font-mono text-zinc-500">+7 (495) 777-00-00</p>
          </div>
        </motion.div>
      </div>

      {!hasValidKey ? (
        <div className="w-full h-full flex items-center justify-center bg-zinc-900 px-6">
           <div className="text-center max-w-lg bg-black border border-zinc-800 p-8 rounded-2xl shadow-2xl">
              <h2 className="text-xl font-display uppercase italic text-gold mb-4">Google Maps API Key Required</h2>
              <p className="text-sm text-zinc-400 mb-6 font-light">
                Чтобы активировать интерактивную карту, добавьте API ключ в настройки проекта.
              </p>
              <div className="text-left text-xs text-zinc-500 space-y-4 font-mono leading-relaxed">
                <p><strong>Шаг 1:</strong> Получите ключ на <a href="https://console.cloud.google.com/google/maps-apis/start" target="_blank" rel="noopener" className="text-gold underline">Google Cloud Console</a></p>
                <p><strong>Шаг 2:</strong> Откройте <strong>Settings</strong> (значок ⚙️ в углу)</p>
                <p><strong>Шаг 3:</strong> В разделе <strong>Secrets</strong> добавьте <code>GOOGLE_MAPS_PLATFORM_KEY</code></p>
              </div>
           </div>
        </div>
      ) : (
        <APIProvider apiKey={API_KEY}>
          <Map
            defaultCenter={center}
            defaultZoom={15}
            mapId="BARBERSHOP_MAP"
            style={{ width: '100%', height: '100%' }}
            disableDefaultUI={true}
            gestureHandling={'greedy'}
            theme="dark"
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          >
            <AdvancedMarker position={center}>
               <Pin background="#D4AF37" glyphColor="#000" borderColor="#D4AF37" />
            </AdvancedMarker>
          </Map>
        </APIProvider>
      )}
    </section>
  );
}
