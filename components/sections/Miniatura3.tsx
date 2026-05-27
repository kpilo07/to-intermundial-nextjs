import { str, imageUrl, extractMiniatura3Items } from '@/lib/cms';
import type { CMSField, Miniatura3Item } from '@/lib/types';

interface Props {
  fields: Record<string, CMSField>;
}

export default function Miniatura3({ fields }: Props) {
  const titulo = str(fields['titulo']);
  const items  = extractMiniatura3Items(fields);

  return (
    <section className="py-64 px-24">
      <div className="max-w-[1200px] mx-auto">

        <h2 className="text-28 md:text-36 leading-36 font-weight-medium text-content-high text-center mb-40">
          {titulo}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
          {items.map((item: Miniatura3Item, i: number) => {
            const imgSrc = imageUrl(item.imagen);
            return (
              <figure key={i} className="flex flex-col gap-16 bg-surface-blue1 rounded-12 p-24 shadow-low">
                {imgSrc && (
                  <div className="w-full h-[160px] rounded-8 overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={item.imagen?.alt ?? item.titulo}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <blockquote className="text-14 leading-22 text-content-mid italic flex-1">
                  &ldquo;{item.descripcion}&rdquo;
                </blockquote>
                <figcaption className="text-14 font-weight-medium text-content-high">
                  — {item.titulo}
                </figcaption>
              </figure>
            );
          })}
        </div>

      </div>
    </section>
  );
}
