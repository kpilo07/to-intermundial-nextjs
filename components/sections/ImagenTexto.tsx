import { imageUrl } from '@/lib/cms';
import type { ImagenTextoFields } from '@/lib/types';

interface Props {
  data: ImagenTextoFields;
}

export default function ImagenTexto({ data }: Props) {
  const { titulo, pretitulo, contenido, imagen, boton, distribucion } = data;

  const imgRight = distribucion[0] === 1;
  const imgSrc   = imageUrl(imagen);

  return (
    <section className="py-64 px-24">
      <div className={`max-w-[1200px] mx-auto flex flex-col gap-32 items-center ${imgRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

        {/* Imagen */}
        {imgSrc && (
          <div className="flex-shrink-0 w-full md:w-[45%]">
            <img
              src={imgSrc}
              alt={imagen?.alt ?? titulo}
              width={imagen?.width}
              height={imagen?.height}
              loading="lazy"
              decoding="async"
              className="w-full rounded-8 object-cover"
            />
          </div>
        )}

        {/* Texto */}
        <div className="flex flex-col gap-16 flex-1">
          {pretitulo && (
            <p className="text-14 font-weight-medium tracking-1-2 uppercase text-semantic-primary">
              {pretitulo}
            </p>
          )}

          <h2 className="text-28 md:text-36 leading-36 md:leading-48 font-weight-medium text-content-high">
            {titulo}
          </h2>

          {contenido && (
            <div
              className="text-16 leading-28 text-content-mid [&_p]:mb-12 [&_a]:text-semantic-primary [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: contenido }}
            />
          )}

          {boton.url && (
            <a
              href={boton.url}
              className="inline-flex items-center gap-8 px-24 py-12 rounded-8 bg-semantic-primary text-white text-16 font-weight-medium w-fit shadow-low hover:opacity-90 transition-opacity"
            >
              {boton.text ?? 'Ver más'}
            </a>
          )}
        </div>

      </div>
    </section>
  );
}
