import type { IconoTextoData } from '@/lib/types';

interface Props {
  data: IconoTextoData;
}

export default function ProductIconoTexto({ data }: Props) {
  const { subtitulo, contenido, urlContenido, imagen } = data;
  const BASE_URL = process.env.CMS_BASE_URL ?? '';
  const imagenUri = imagen?.uri ? `${BASE_URL}${imagen.uri}` : null;

  return (
    <div className="w-full px-32 max-m:px-24 max-xs:px-16 mb-[64px] max-s:mb-[48px]">
      <div
        className="flex items-center gap-32 max-s:gap-24 max-xs:flex-col max-xs:text-center rounded-16 px-40 py-32 max-s:px-24 max-xs:px-20 max-s:py-24"
        style={{ background: 'linear-gradient(135deg, #EEF6FF 0%, #E0F0FF 100%)' }}
      >

        {/* Icono */}
        {imagenUri && (
          <div className="flex-shrink-0">
            <img
              src={imagenUri}
              alt={imagen?.alt || ''}
              width="80"
              height="80"
              className="w-[80px] h-[80px] max-s:w-[64px] max-s:h-[64px] object-contain"
              loading="lazy"
            />
          </div>
        )}

        {/* Texto */}
        <div className="flex-1 min-w-0">
          {subtitulo && (
            <h2 className="font-helvetica-now-medium font-weight-medium text-content-high text-[1.25rem] leading-[1.25] mb-8 max-s:text-[1.125rem]">
              {subtitulo}
            </h2>
          )}
          {contenido && (
            <p className="text-16 max-xs:text-14 leading-24 text-content-medium font-helvetica-now-regular">
              {contenido}
            </p>
          )}
        </div>

        {/* CTA */}
        {urlContenido?.url && (
          <div className="flex-shrink-0 max-xs:w-full">
            <a
              href={urlContenido.url}
              className="inline-flex items-center justify-center px-24 py-12 rounded-8 bg-semantic-primary text-white text-16 font-weight-medium hover:opacity-90 transition-opacity shadow-low max-xs:w-full"
            >
              {urlContenido.text || 'Ver más'}
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
