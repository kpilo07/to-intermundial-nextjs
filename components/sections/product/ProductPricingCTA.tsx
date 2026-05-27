import type { TablaComparativaBasicData } from '@/lib/types';

interface Props {
  data:          TablaComparativaBasicData;
  seguroNombre?: string;
}

export default function ProductPricingCTA({ data, seguroNombre = 'Totaltravel' }: Props) {
  const { pretitulo, titulo, price } = data;

  return (
    <section
      className="w-full py-[80px] max-s:py-[56px] mb-[96px] max-s:mb-[64px]"
      style={{ background: 'var(--color-surface-contrast)' }}
    >
      <div className="px-32 max-m:px-24 max-xs:px-16">

        {/* Titular */}
        <div className="text-center mb-48 max-s:mb-32">
          {pretitulo && (
            <p className="text-14 leading-20 text-content-medium font-helvetica-now-regular uppercase tracking-[0.08em] mb-8">
              {pretitulo}
            </p>
          )}
          {titulo && (
            <h2 className="font-helvetica-now-medium font-weight-medium text-content-high text-[2rem] leading-[1.15] max-s:text-[1.75rem]">
              {titulo}
            </h2>
          )}
        </div>

        {/* Card de precio */}
        <div className="flex justify-center">
          <div className="bg-white rounded-16 shadow-medium px-40 py-40 max-xs:px-24 flex flex-col items-center text-center w-full max-w-[360px]">

            <h3 className="text-20 font-weight-medium text-content-high mb-8 leading-28">
              {seguroNombre}
            </h3>

            <div className="w-40 h-[2px] bg-semantic-primary mb-24 rounded-full" />

            {price && (
              <div className="mb-4">
                <span className="text-14 text-content-low leading-20">Desde</span>
              </div>
            )}
            {price && (
              <div className="flex items-end gap-4 mb-4">
                <span className="text-[2.75rem] leading-[1] font-helvetica-now-medium text-semantic-primary">
                  {price}€
                </span>
              </div>
            )}
            {price && (
              <p className="text-12 text-content-low mb-32 leading-18">por persona</p>
            )}

            <a
              href="/seguros-de-viaje"
              className="w-full flex items-center justify-center py-16 px-32 rounded-8 mb-12 bg-semantic-primary text-white text-16 font-weight-medium hover:opacity-90 transition-opacity shadow-low"
            >
              Calcular precio
            </a>

            <a
              href="/seguros-de-viaje/seguro-totaltravel/coberturas"
              className="text-14 text-semantic-primary font-weight-medium hover:underline transition-colors"
            >
              Ver coberturas detalladas →
            </a>

          </div>
        </div>

        <p className="text-center text-12 text-content-low mt-32 leading-18">
          Más de 5,7M de clientes confían en nosotros · Atención 24h
        </p>

      </div>
    </section>
  );
}
