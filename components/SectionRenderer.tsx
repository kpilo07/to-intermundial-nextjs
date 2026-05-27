import type { CMSChild } from '@/lib/types';
import {
  extractImagenTexto,
  fetchHeaderTags,
  extractHeaderData,
} from '@/lib/cms';

import HeaderHero          from './sections/HeaderHero';
import ImagenTexto         from './sections/ImagenTexto';
import Miniatura4          from './sections/Miniatura4';
import Miniatura3          from './sections/Miniatura3';
import PreguntasFrecuentes from './sections/PreguntasFrecuentes';
import BannerMedios        from './sections/BannerMedios';

interface Props {
  section: CMSChild;
}

export default async function SectionRenderer({ section }: Props) {
  const { contentTypeIdentifier, fields } = section.content;

  let headerData = null;
  if (contentTypeIdentifier === 'seccion_render') {
    const cabeceraBlock = section.children?.find(
      (c) => c.content.contentTypeIdentifier === 'cabecera_block'
    );
    if (cabeceraBlock) {
      const tags = await fetchHeaderTags(cabeceraBlock.locationId);
      headerData = extractHeaderData(cabeceraBlock, tags);
    }
  }

  return (
    <>
      {contentTypeIdentifier === 'seccion_render' && headerData && (
        <HeaderHero header={headerData} />
      )}

      {contentTypeIdentifier === 'imagen_texto' && (
        <ImagenTexto data={extractImagenTexto(fields)} />
      )}

      {contentTypeIdentifier === 'miniatura_4' && (
        <Miniatura4 fields={fields} />
      )}

      {contentTypeIdentifier === 'miniatura_3' && (
        <Miniatura3 fields={fields} />
      )}

      {contentTypeIdentifier === 'preguntas_frecuentes' && (
        <PreguntasFrecuentes fields={fields} />
      )}

      {contentTypeIdentifier === 'banner_medios' && (
        <BannerMedios fields={fields} />
      )}
    </>
  );
}
