import type { HeaderData } from '@/lib/types';

interface Props {
  header: HeaderData;
}

export default function HeaderHero({ header }: Props) {
  const { titulo, descripcion, bgL, bgM, bgS, bgXs, bgPosition, tags } = header;

  return (
    <div className="header-container w-full px-32 max-m:px-24 max-xs:px-16 mb-[96px] max-m:mb-[72px] max-s:mb-[64px]">
      <div className="relative">
        <div
          id="header-home"
          className="relative rounded-16 overflow-hidden min-h-[606px] py-48 max-m:py-40 max-xs:py-40 max-xs:px-16 grid grid-cols-[536px_464px] gap-[120px] justify-center items-center max-m:grid-cols-[356px_412px] max-m:gap-[64px] max-s:flex max-s:flex-col max-s:gap-[32px]"
          style={{ backgroundPosition: bgPosition, backgroundSize: 'cover' }}
        >

          {/* Imagen de fondo responsiva */}
          <picture
            className="absolute inset-0 z-0 w-full h-full overflow-hidden rounded-16"
            aria-hidden="true"
          >
            {bgXs && <source srcSet={bgXs} media="(max-width: 639px)" />}
            {bgS  && <source srcSet={bgS}  media="(max-width: 959px)" />}
            {bgM  && <source srcSet={bgM}  media="(max-width: 1279px)" />}
            {bgL  && <source srcSet={bgL}  media="(min-width: 1280px)" />}
            <img
              fetchPriority="high"
              src={bgXs ?? bgL ?? ''}
              alt=""
              className="w-full h-full object-cover min-w-full"
              width="1536"
              height="908"
            />
          </picture>

          {/* Overlay oscuro */}
          <div
            className="absolute inset-0 z-[1] rounded-16"
            style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.45), rgba(0,0,0,0.45))' }}
            aria-hidden="true"
          />

          {/* Contenido izquierda */}
          <div className="relative z-[2] flex flex-col justify-center">

            <div className="flex flex-col gap-24 mb-40 max-s:mb-32 max-xs:mb-40">
              {titulo && (
                <h1 className="font-helvetica-now-medium font-weight-medium text-white text-[3.5rem] leading-[1.1] max-m:text-[2.75rem] max-s:text-[2.25rem] max-xs:text-[2rem]">
                  {titulo}
                </h1>
              )}
              {descripcion && (
                <p className="text-16 leading-28 text-white font-helvetica-now-regular max-w-[461px]">
                  {descripcion}
                </p>
              )}
            </div>

            {/* Tags pill */}
            {tags.length > 0 && (
              <div className="flex items-start content-start gap-16 flex-wrap max-xs:flex-col max-xs:gap-8">
                {tags.map((tag, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-8 px-24 py-8 rounded-[40px] max-xs:w-full"
                    style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(8px)' }}
                  >
                    {tag.iconUri && (
                      <img
                        src={tag.iconUri}
                        alt={tag.iconAlt || ''}
                        width="24"
                        height="24"
                        className="w-24 h-24 max-xs:w-28 max-xs:h-28 flex-shrink-0"
                        loading="eager"
                      />
                    )}
                    <span className="text-14 leading-20 text-white font-helvetica-now-regular">
                      {tag.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Columna derecha: cotizador placeholder */}
          <div className="relative z-[2] max-s:hidden">
            <div
              className="bg-white rounded-16 p-24 shadow-medium"
              role="complementary"
              aria-label="Cotizador de seguros"
            >
              <p className="text-16 font-weight-medium text-content-high mb-16 leading-24">
                ¿A dónde quieres viajar?
              </p>
              <a
                href="/seguros-de-viaje"
                className="flex items-center justify-center w-full py-14 px-24 rounded-8 bg-semantic-primary text-white text-16 font-weight-medium hover:opacity-90 transition-opacity shadow-low"
              >
                Comparar seguros
              </a>
              <p className="text-12 leading-18 text-content-low text-center mt-12">
                Más de 5,7M de clientes confían en nosotros
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
