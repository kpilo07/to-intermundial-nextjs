import { str, url } from '@/lib/cms';
import type { CMSField } from '@/lib/types';

interface Props {
  fields: Record<string, CMSField>;
}

export default function PreguntasFrecuentes({ fields }: Props) {
  const titulo = str(fields['titulo']);
  const boton  = url(fields['boton']);

  return (
    <section className="py-64 px-24 bg-surface-gray2">
      <div className="max-w-[1200px] mx-auto text-center flex flex-col gap-24 items-center">

        <h2 className="text-28 md:text-36 leading-36 font-weight-medium text-content-high">
          {titulo}
        </h2>

        <p className="text-16 leading-28 text-content-mid max-w-[600px]">
          Encuentra aquí las respuestas a las dudas más comunes sobre nuestros seguros de viaje.
        </p>

        {boton.url && (
          <a
            href={boton.url}
            className="inline-flex items-center gap-8 px-24 py-12 rounded-8 shadow-stroke-mid bg-white text-semantic-primary text-16 font-weight-medium hover:shadow-semantic-primary transition-shadow"
          >
            {boton.text ?? 'Ver preguntas'}
          </a>
        )}

      </div>
    </section>
  );
}
