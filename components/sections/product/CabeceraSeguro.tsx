import type { CabeceraSeguroData, EstructuraNavData } from '@/lib/types';

interface Props {
  cabecera:       CabeceraSeguroData;
  structuredData: EstructuraNavData;
}

export default function CabeceraSeguro({ cabecera, structuredData }: Props) {
  const { textoPrincipal, pretitulo, imagenMobile, imagenLg } = cabecera;
  const { offersPrice, ratingValue, ratingCount } = structuredData;

  const rating     = parseFloat(ratingValue) || 0;
  const fullStars  = Math.floor(rating);
  const halfStar   = rating - fullStars >= 0.25;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <section
      id="header-seguro"
      className="relative w-full overflow-hidden min-h-[400px] max-s:min-h-[300px] flex items-end mb-[64px] max-s:mb-[48px]"
      aria-label={textoPrincipal}
    >

      {/* Imagen de fondo responsiva */}
      <picture className="absolute inset-0 z-0 w-full h-full" aria-hidden="true">
        {imagenMobile && <source srcSet={imagenMobile} media="(max-width: 639px)" />}
        {imagenLg     && <source srcSet={imagenLg}     media="(min-width: 640px)" />}
        <img
          fetchPriority="high"
          src={imagenMobile ?? imagenLg ?? ''}
          alt=""
          className="w-full h-full object-cover object-center min-w-full min-h-full"
          width="1440"
          height="500"
        />
      </picture>

      {/* Overlay gradient */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.10) 100%)' }}
        aria-hidden="true"
      />

      {/* Contenido */}
      <div className="relative z-[2] w-full px-32 max-m:px-24 max-xs:px-16 py-48 max-s:py-32">
        <div className="max-w-[640px]">

          {/* Breadcrumb */}
          <nav className="mb-16" aria-label="Breadcrumb">
            <ol className="flex items-center gap-8 flex-wrap">
              <li>
                <a href="/" className="text-12 text-white/70 hover:text-white transition-colors">Inicio</a>
              </li>
              <li className="text-12 text-white/40" aria-hidden="true">/</li>
              <li>
                <a href="/seguros-de-viaje" className="text-12 text-white/70 hover:text-white transition-colors">
                  Seguros de viaje
                </a>
              </li>
              <li className="text-12 text-white/40" aria-hidden="true">/</li>
              <li>
                <span className="text-12 text-white/90" aria-current="page">Totaltravel</span>
              </li>
            </ol>
          </nav>

          {/* Pretítulo */}
          {pretitulo && (
            <p className="text-16 max-xs:text-14 text-white/90 font-helvetica-now-regular mb-16 leading-24">
              {pretitulo}
            </p>
          )}

          {/* H1 */}
          {textoPrincipal && (
            <h1 className="font-helvetica-now-medium font-weight-medium text-white text-[2.5rem] leading-[1.1] max-m:text-[2rem] max-s:text-[1.75rem] max-xs:text-[1.5rem] mb-24 max-s:mb-16">
              {textoPrincipal}
            </h1>
          )}

          {/* Rating + precio */}
          <div className="flex items-center gap-24 flex-wrap">

            {/* Estrellas */}
            {rating > 0 && (
              <div className="flex items-center gap-8" aria-label={`Valoración: ${ratingValue} de 5`}>
                <div className="flex items-center gap-2" aria-hidden="true">
                  {Array.from({ length: fullStars }).map((_, i) => (
                    <svg key={`full-${i}`} className="w-16 h-16 text-[#F4B400]" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1l1.8 3.7L14 5.5l-3 2.9.7 4.1L8 10.5l-3.7 2 .7-4.1-3-2.9 4.2-.8z"/>
                    </svg>
                  ))}
                  {halfStar && (
                    <svg className="w-16 h-16 text-[#F4B400]" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1v9.5l-3.7 2 .7-4.1-3-2.9 4.2-.8L8 1z"/>
                      <path d="M8 1l1.8 3.7L14 5.5l-3 2.9.7 4.1L8 10.5V1z" fill="rgba(255,255,255,0.30)"/>
                    </svg>
                  )}
                  {Array.from({ length: emptyStars }).map((_, i) => (
                    <svg key={`empty-${i}`} className="w-16 h-16 text-white/30" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1l1.8 3.7L14 5.5l-3 2.9.7 4.1L8 10.5l-3.7 2 .7-4.1-3-2.9 4.2-.8z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-14 text-white/90 font-helvetica-now-regular">
                  {ratingValue}{' '}
                  <span className="text-white/60">({Number(ratingCount).toLocaleString('es-ES')} valoraciones)</span>
                </span>
              </div>
            )}

            {/* Desde precio (mobile) */}
            {offersPrice && (
              <div className="hidden max-s:flex items-center gap-8">
                <span className="text-14 text-white/70">Desde</span>
                <span className="text-[1.25rem] font-helvetica-now-medium text-white">{offersPrice}€</span>
                <span className="text-12 text-white/60">/ persona</span>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Tarjeta de precio (desktop) */}
      {offersPrice && (
        <div className="absolute right-32 max-m:right-24 bottom-32 max-m:bottom-24 z-[3] max-s:hidden">
          <div
            className="bg-white rounded-16 p-24 shadow-medium min-w-[240px]"
            role="complementary"
            aria-label="Precio del seguro"
          >
            <p className="text-12 text-content-low mb-4 leading-18">Desde</p>
            <p className="text-[2rem] leading-[1.1] font-helvetica-now-medium text-semantic-primary mb-2">
              {offersPrice}€
            </p>
            <p className="text-12 text-content-low mb-20 leading-18">por persona</p>
            <a
              href="/seguros-de-viaje"
              className="flex items-center justify-center w-full py-14 px-24 rounded-8 bg-semantic-primary text-white text-16 font-weight-medium hover:opacity-90 transition-opacity shadow-low"
            >
              Calcular precio
            </a>
          </div>
        </div>
      )}

    </section>
  );
}
