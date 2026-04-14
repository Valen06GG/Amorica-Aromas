export default function Footer() {
    return (
        <footer className="bg-[#e8dfd3] text-[#5a4634] border-t border-[#d6c7b2]">
          <div className="max-w-6xl mx-auto px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
            <div>
              <h2 className="text-xl font-semibold tracking-wide">
                Amórica aromas
              </h2>
              <p className="text-sm mt-2 text-[#7a5c3e]">
                Aromas que transforman espacios ✨
              </p>
            </div>
        
            <div className="flex flex-col items-start justify-start text-left">
              <h3 className="text-md font-semibold mb-2 border-b border-[#cbb89d] inline-block">
                Contacto
              </h3>
        
              <p className="text-sm mt-2">Ituzaingó, Bs.As</p>
        
              <a
                href="https://wa.me/541127493992"
                className="group text-sm block mt-3 self-start text-[#5a4634] hover:text-[#8f5c30] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                clickea para contactarnos por WhatsApp
                {/* Contenedor idéntico para ambos iconos */}
                <div className="grid place-items-start mt-2"> 
                    {/* SVG o PNG transparente - Ejemplo usando PNG transparente */}
                    <img 
                      src="/path/to/tu/logo_whatsapp_plano.svg" // O PNG transparente
                      alt="WhatsApp" 
                      className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                </div>
              </a>

              <a
                href="https://www.instagram.com/amorica.aromas/?hl=es"
                className="group text-sm block mt-4 self-start text-[#5a4634] hover:text-[#8f5c30] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                clickea para seguirnos en Instagram
                <div className="grid place-items-start mt-2">
                    <img 
                      src="/path/to/tu/logo_instagram_transparente.png"
                      alt="Instagram" 
                      className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" 
                    />
                </div>
              </a>
            </div>
        
            <div>
              <h3 className="text-md font-semibold mb-2 border-b border-[#cbb89d] inline-block">
                Información
              </h3>
        
              <p className="text-sm mt-2">Envíos:</p>
              <ul className="text-sm ml-2 text-[#7a5c3e]">
                <li>• Correo</li>
                <li>• Motomensajería</li>
                <li>• Puntos de encuentro</li>
              </ul>
        
              <p className="text-sm mt-3">Pagos:</p>
              <p className="text-sm text-[#7a5c3e]">
                Transferencia / Efectivo
              </p>
            </div>
        
          </div>
        
          <div className="text-center text-xs text-[#7a5c3e] pb-6">
            © {new Date().getFullYear()} Amórica aromas
          </div>
        
        </footer>
    )
}