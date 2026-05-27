import { str, imageUrl, extractMiniatura4Items } from '@/lib/cms';
import type { CMSField, Miniatura4Item } from '@/lib/types';

interface Props {
  fields: Record<string, CMSField>;
}

export default function Miniatura4({ fields }: Props) {
  const titulo    = str(fields['titulo']);
  const pretitulo = str(fields['pretitulo']);
  const items     = extractMiniatura4Items(fields);

  return (
    <section className="py-64 px-24 bg-alt">
      <div className="max-w-[1200px] mx-auto">

        {/* Encabezado */}
        <div className="mb-40 text-center">
          {pretitulo && (
            <p className="text-14 font-weight-medium tracking-1-2 uppercase text-semantic-primary mb-8">
              {pretitulo}
            </p>
          )}
          <h2 className="text-28 md:text-36 leading-36 font-weight-medium text-content-high">
            {titulo}
          </h2>
        </div>

        {/* Grid de artículos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24">
          {items.map((item: Miniatura4Item, i: number) => {
            const imgSrc = imageUrl(item.imagen);
            return (
              <article key={i} className="flex flex-col rounded-8 overflow-hidden shadow-low bg-white group">
                {imgSrc && (
                  <div className="overflow-hidden h-[180px]">
                    <img
                      src={imgSrc}
                      alt={item.imagen?.alt ?? item.titulo}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-16 flex flex-col gap-8 flex-1">
                  <h3 className="text-16 font-weight-medium leading-24 text-content-high">
                    {item.titulo}
                  </h3>
                  <p className="text-14 leading-22 text-content-mid flex-1">
                    {item.descripcion}
                  </p>
                  {item.url.url && (
                    <a
                      href={item.url.url}
                      className="text-14 font-weight-medium text-semantic-primary hover:underline mt-8 inline-flex items-center gap-4"
                    >
                      {item.url.text ?? 'Leer más'}
                      <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
