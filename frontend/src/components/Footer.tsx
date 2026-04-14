export default function Footer() {
    return (
        <footer className="bg-[#e8dfd3] text-[#5a4634] border-t border-[#d6c7b2]">
          <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
            <div>
              <h2 className="text-xl font-semibold tracking-wide">
                Amórica aromas
              </h2>
              <p className="text-sm mt-2 text-[#7a5c3e]">
                Aromas que transforman espacios ✨
              </p>
            </div>
        
            <div className="flex flex-col items-start justify-start">
              <h3 className="text-md font-semibold mb-2 border-b border-[#cbb89d] inline-block">
                Contacto
              </h3>
        
              <p className="text-sm mt-2">Ituzaingó, Bs.As</p>
        
              <a
                href="https://wa.me/541127493992"
                className="text-sm flex flex-col items-start mt-4 group transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="group-hover:text-[#8f5c30]">clickea para contactarnos por WhatsApp</span>
                <img 
                  src="logo_whatsapp.png" 
                  alt="WhatsApp" 
                  className="w-14 h-14 object-contain mt-1 group-hover:scale-110 transition-transform" 
                />
              </a>

              <a
                href="https://www.instagram.com/amorica.aromas/?hl=es"
                className="text-sm flex flex-col items-start mt-4 group transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="group-hover:text-[#8f5c30]">clickea para seguirnos en Instagram</span>
                <img 
                  src="instagram.png" 
                  alt="Instagram" 
                  className="w-12 h-12 object-contain mt-2 group-hover:scale-110 transition-transform" 
                />
              </a>
            </div>
        
            <div>
              <h3 className="text-md font-semibold mb-2 border-b border-[#cbb89d] inline-block">
                Información
              </h3>
        
              <p className="text-sm mt-2 font-medium">Envíos:</p>
              <ul className="text-sm ml-2 text-[#7a5c3e]">
                <li>• Correo</li>
                <li>• Motomensajería</li>
                <li>• Puntos de encuentro</li>
              </ul>
        
              <p className="text-sm mt-3 font-medium">Pagos:</p>
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