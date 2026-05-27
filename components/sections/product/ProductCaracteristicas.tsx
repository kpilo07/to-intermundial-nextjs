import type { CaracteristicasData } from '@/lib/types';

interface Props {
  data: CaracteristicasData;
}

export default function ProductCaracteristicas({ data }: Props) {
  const { pretitulo, titulo, imagenPrincipal, items } = data;

  return (
    <section className="w-full px-32 max-m:px-24 max-xs:px-16 mb-[96px] max-s:mb-[64px]">

      {/* Titular (desktop) */}
      <div className="mb-40 max-s:mb-32 max-m:hidden">
        {pretitulo && (
          <p className="text-14 leading-20 text-content-medium font-helvetica-now-regular uppercase tracking-[0.08em] mb-8">
            {pretitulo}
          </p>
        )}
        {titulo && (
          <h2 className="font-helvetica-now-medium font-weight-medium text-content-high text-[2rem] leading-[1.15]">
            {titulo}
          </h2>
        )}
      </div>

      <div className="grid grid-cols-[560px_1fr] gap-[80px] items-start max-m:flex max-m:flex-col max-m:gap-[40px]">

        {/* Columna izquierda: imagen */}
        {imagenPrincipal && (
          <div className="max-m:order-2">
            <img
              src={imagenPrincipal}
              alt={titulo || ''}
              className="w-full max-w-[560px] rounded-16 shadow-medium object-cover"
              loading="lazy"
              width="560"
              height="420"
            />
          </div>
        )}

        {/* Columna derecha: texto + acordeón */}
        <div className={imagenPrincipal ? 'max-m:order-1' : 'col-span-2'}>

          {/* Título (tablet/mobile) */}
          <div className="mb-32 max-m:mb-24 hidden max-m:block">
            {pretitulo && (
              <p className="text-14 leading-20 text-content-medium font-helvetica-now-regular uppercase tracking-[0.08em] mb-8">
                {pretitulo}
              </p>
            )}
            {titulo && (
              <h2 className="font-helvetica-now-medium font-weight-medium text-content-high text-[1.75rem] leading-[1.2]">
                {titulo}
              </h2>
            )}
          </div>

          {/* Acordeón */}
          <div className="flex flex-col">
            {items.map((item, idx) => (
              <details
                key={idx}
                className="group border-b border-stroke-low last:border-b-0"
                open={idx === 0}
              >
                <summary className="flex items-center justify-between gap-16 py-20 cursor-pointer list-none hover:text-semantic-primary transition-colors">
                  <h3 className="text-16 leading-24 font-weight-medium text-content-high group-open:text-semantic-primary transition-colors">
                    {item.titulo}
                  </h3>
                  <svg
                    className="w-20 h-20 flex-shrink-0 text-content-medium transition-transform group-open:rotate-180"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 8l5 5 5-5" />
                  </svg>
                </summary>

                <div className="pb-20 pt-4">
                  <p className="text-16 leading-28 text-content-medium font-helvetica-now-regular">
                    {item.descripcion}
                  </p>
                  {item.url?.url && (
                    <a
                      href={item.url.url}
                      className="inline-flex items-center gap-8 mt-12 text-14 text-semantic-primary font-weight-medium hover:underline"
                    >
                      {item.url.text || 'Ver más'}
                      <svg className="w-14 h-14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 7h10M8 3l4 4-4 4" />
                      </svg>
                    </a>
                  )}
                </div>
              </details>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
