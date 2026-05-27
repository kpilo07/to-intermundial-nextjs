import { str, imageUrl, extractBannerMediosItems } from '@/lib/cms';
import type { CMSField, BannerMediosItem } from '@/lib/types';

interface Props {
  fields: Record<string, CMSField>;
}

export default function BannerMedios({ fields }: Props) {
  const titulo = str(fields['titulo']);
  const items  = extractBannerMediosItems(fields);

  return (
    <section className="py-48 px-24 border-t border-stroke-low">
      <div className="max-w-[1200px] mx-auto">

        {titulo && (
          <p className="text-14 font-weight-medium tracking-1-2 uppercase text-content-mid text-center mb-32">
            {titulo}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-32">
          {items.map((item: BannerMediosItem, i: number) => {
            const imgSrc = imageUrl(item.imagen);
            if (!imgSrc) return null;
            return (
              <a
                key={i}
                href={item.url.url ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity"
                aria-label={item.imagen.alt || 'Medio de comunicación'}
              >
                <img
                  src={imgSrc}
                  alt={item.imagen.alt ?? ''}
                  width={item.imagen.width}
                  height={item.imagen.height}
                  loading="lazy"
                  decoding="async"
                  className="h-[40px] w-auto object-contain"
                />
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
