import type { Miniatura3Item } from '@/lib/types';

interface Props {
  titulo?: string;
  items:   Miniatura3Item[];
}

export default function ProductVentajas({ titulo = 'Ventajas de contratar en Intermundial', items }: Props) {
  const BASE_URL = process.env.CMS_BASE_URL ?? '';

  if (items.length === 0) return null;

  return (
    <section className="w-full px-32 max-m:px-24 max-xs:px-16 mb-[96px] max-s:mb-[64px]">

      {titulo && (
        <h2 className="text-center font-helvetica-now-medium font-weight-medium text-content-high text-[2rem] max-s:text-[1.75rem] leading-[1.15] mb-48 max-s:mb-32">
          {titulo}
        </h2>
      )}

      <div className="grid grid-cols-3 gap-[32px] max-m:grid-cols-2 max-m:gap-[24px] max-xs:grid-cols-1 max-xs:gap-[16px]">
        {items.map((item, i) => {
          const imgUri = item.imagen?.uri ? `${BASE_URL}${item.imagen.uri}` : null;
          return (
            <div
              key={i}
              className="flex flex-col items-start gap-16 bg-surface-contrast rounded-16 p-32 max-s:p-24 shadow-stroke-low"
            >
              {imgUri && (
                <img
                  src={imgUri}
                  alt={item.imagen?.alt || ''}
                  width="64"
                  height="64"
                  className="w-[64px] h-[64px] object-contain"
                  loading="lazy"
                />
              )}
              {item.titulo && (
                <h3 className="text-18 leading-[1.3] font-weight-medium text-content-high">
                  {item.titulo}
                </h3>
              )}
              {item.descripcion && (
                <p className="text-14 leading-22 text-content-medium font-helvetica-now-regular">
                  {item.descripcion}
                </p>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}
