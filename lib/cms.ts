import type {
  CMSHomeResponse,
  CMSField,
  CMSChild,
  ImageValue,
  UrlValue,
  ImagenTextoFields,
  Miniatura4Item,
  Miniatura3Item,
  BannerMediosItem,
  MenuItem,
  MenuData,
  FooterSubItem,
  FooterColumn,
  FooterData,
  HeaderTag,
  HeaderData,
  CabeceraSeguroData,
  EstructuraNavData,
  IconoTextoData,
  CaracteristicasData,
  TablaComparativaBasicData,
  ProductPageData,
} from './types';

// ─── Config ──────────────────────────────────────────────────────────────────

/** Mapeo de locale → código de idioma del CMS */
export const LOCALE_TO_CMS_LANG: Record<string, string> = {
  es: 'esl-ES',
  it: 'ita-IT',
  pt: 'por-PT',
};

const BASE_URL  = process.env.CMS_BASE_URL!;
const API_KEY   = process.env.CMS_API_KEY!;
const LANG      = process.env.CMS_LANG!;
const HOME_ID   = process.env.CMS_HOME_LOCATION_ID!;

const MENU_LOCATION_ID       = process.env.CMS_MENU_LOCATION_ID!;
const SUBMENUS_LOCATION_ID   = '103';
const TOP_LEFT_LOCATION_ID   = '13273';
const TOP_RIGHT_LOCATION_ID  = '13271';

const FOOTER_LOCATION_ID          = process.env.CMS_FOOTER_LOCATION_ID!;
const FOOTER_SUBMENUS_LOCATION_ID = '13525';
const FOOTER_LEGAL_LEFT_ID        = '15122';
const FOOTER_LEGAL_RIGHT_ID       = '15124';

// ─── Fetch base ──────────────────────────────────────────────────────────────

async function fetchLocation(
  locationId: string | number,
  limit = 50,
  depth?: number,
  lang: string = LANG,
): Promise<CMSHomeResponse> {
  const depthParam = depth !== undefined ? `&depth=${depth}` : '';
  const fetchUrl = `${BASE_URL}/apicms/fullcontent/${locationId}?lang=${lang}&limit=${limit}${depthParam}`;
  const res = await fetch(fetchUrl, { headers: { 'X-Api-Key': API_KEY }, cache: 'force-cache' });
  if (!res.ok) throw new Error(`CMS fetch failed [${res.status}]: ${fetchUrl}`);
  return res.json() as Promise<CMSHomeResponse>;
}

function absoluteUri(uri: string | null | undefined): string | null {
  if (!uri) return null;
  return `${BASE_URL}${uri}`;
}

export async function fetchHomeContent(lang: string = LANG): Promise<CMSHomeResponse> {
  const url = `${BASE_URL}/apicms/fullcontent/${HOME_ID}?lang=${lang}&limit=20&depth=2`;
  const res = await fetch(url, { headers: { 'X-Api-Key': API_KEY }, cache: 'force-cache' });
  if (!res.ok) throw new Error(`CMS fetch failed [${res.status}]: ${url}`);
  return res.json() as Promise<CMSHomeResponse>;
}

export async function fetchHeaderTags(cabeceraLocationId: number): Promise<HeaderTag[]> {
  const data = await fetchLocation(cabeceraLocationId, 10);
  return data.children
    .filter((c) => c.content.contentTypeIdentifier === 'item_icon')
    .map((c) => {
      const f = c.content.fields;
      const iconField = f['icon'];
      const iconVal   = iconField?.type === 'ezimage' ? iconField.value as ImageValue | null : null;
      return {
        title:   str(f['title']) || c.content.name,
        iconUri: iconVal?.uri  ?? '',
        iconAlt: iconVal?.alt  ?? '',
      };
    });
}

export function extractHeaderData(cabeceraBlock: CMSChild, tags: HeaderTag[]): HeaderData {
  const f = cabeceraBlock.content.fields;

  const getImgUri = (key: string): string | null => {
    const field = f[key];
    if (!field || field.type !== 'ezimage' || !field.value) return null;
    return `${BASE_URL}${(field.value as ImageValue).uri}`;
  };

  let desc = '';
  if (f['descripcion']?.type === 'ezxmltext') {
    desc = (f['descripcion'].value as string)
      .replace(/<\?xml[^>]*\?>\n?/, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  return {
    titulo:      str(f['titulo']),
    descripcion: desc,
    bgL:         getImgUri('imagen_fondo'),
    bgM:         getImgUri('imagen_fondo_m'),
    bgS:         getImgUri('imagen_fondo_s'),
    bgXs:        getImgUri('imagen_fondo_xs'),
    bgPosition:  str(f['background_position']) || 'center center',
    tags,
  };
}

// ─── Menu ─────────────────────────────────────────────────────────────────────

const PRODUCT_PAGE_URLS: Record<number, string> = {
  118:   '/seguros-de-viaje/seguro-totaltravel',
  123:   '/seguros-de-viaje/seguro-go-cruise',
  120:   '/seguros-de-viaje/seguro-totaltravel-annual',
  119:   '/seguros-de-viaje/seguro-larga-estancia-grand-tour-365',
  128:   '/seguros-de-viaje',
  142:   '/seguros-deportivos/seguro-totalsports',
  73303: '/seguros-deportivos/seguro-aquasports',
  73305: '/seguros-deportivos/seguro-runsports',
  2127:  '/seguros-deportivos',
};

const _menuCaches = new Map<string, MenuData>();

function childToMenuItem(child: CMSChild): MenuItem {
  const f = child.content.fields;
  const urlExt = f['url_externa']?.type === 'ezurl'
    ? f['url_externa'].value as { url: string | null; text: string | null }
    : null;
  const relMultiple = f['relacion_multiple']?.value as string | undefined;

  const resolvedUrl = urlExt?.url ?? PRODUCT_PAGE_URLS[child.content.id] ?? null;

  return {
    locationId: child.locationId,
    contentId:  child.content.id,
    nombre:     str(f['nombre']) || child.content.name,
    url:        resolvedUrl,
    iconUrl:    str(f['url_icono']) || null,
    clase:      str(f['clase']),
    contenido:  str(f['contenido']),
    submenuIds: relMultiple
      ? relMultiple.split(',').map(Number).filter(Boolean)
      : [],
  };
}

export async function fetchMenuContent(lang: string = LANG): Promise<MenuData> {
  if (_menuCaches.has(lang)) return _menuCaches.get(lang)!;

  const [rootData, submenusData, leftData, rightData] = await Promise.all([
    fetchLocation(MENU_LOCATION_ID,      50, undefined, lang),
    fetchLocation(SUBMENUS_LOCATION_ID,  50, undefined, lang),
    fetchLocation(TOP_LEFT_LOCATION_ID,  50, undefined, lang),
    fetchLocation(TOP_RIGHT_LOCATION_ID, 50, undefined, lang),
  ]);

  const mainNavChildren = rootData.children.filter(
    (c) => c.content.contentTypeIdentifier === 'enlaces',
  );

  const result: MenuData = {
    topBarLeft:  leftData.children.map(childToMenuItem),
    topBarRight: rightData.children.map(childToMenuItem),
    mainNav:     mainNavChildren.map(childToMenuItem),
    submenus:    submenusData.children.map(childToMenuItem),
  };

  _menuCaches.set(lang, result);
  return result;
}

// ─── Field helpers ────────────────────────────────────────────────────────────

export function str(field: CMSField | undefined): string {
  if (!field || field.type !== 'ezstring') return '';
  return field.value ?? '';
}

export function img(field: CMSField | undefined): ImageValue | null {
  if (!field || field.type !== 'ezimage') return null;
  return field.value;
}

export function url(field: CMSField | undefined): UrlValue {
  if (!field || field.type !== 'ezurl') return { url: null, text: null };
  return field.value;
}

export function imageUrl(image: ImageValue | null): string | null {
  if (!image?.uri) return null;
  return `${BASE_URL}${image.uri}`;
}

// ─── XML → HTML converter ─────────────────────────────────────────────────────

export function parseXmlContent(xml: string): string {
  if (!xml) return '';

  return xml
    .replace(/<\?xml[^>]*\?>\n?/, '')
    .replace(/<section[^>]*>/, '')
    .replace(/<\/section>/, '')
    .replace(/<paragraph>/g, '<p>')
    .replace(/<\/paragraph>/g, '</p>')
    .replace(/<line>/g, '<br>')
    .replace(/<\/line>/g, '')
    .replace(/<link url="([^"]+)"[^>]*>/g, '<a href="$1" class="text-semantic-primary underline">')
    .replace(/<\/link>/g, '</a>')
    .replace(/<strong>/g, '<strong>')
    .replace(/<\/strong>/g, '</strong>')
    .replace(/<emphasize>/g, '<em>')
    .replace(/<\/emphasize>/g, '</em>')
    .trim();
}

// ─── Section data extractors ──────────────────────────────────────────────────

export function extractImagenTexto(
  fields: Record<string, CMSField>
): ImagenTextoFields {
  return {
    nombre:       str(fields['nombre']),
    titulo:       str(fields['titulo']),
    pretitulo:    str(fields['pretitulo']),
    contenido:    parseXmlContent(
                    fields['contenido']?.type === 'ezxmltext'
                      ? fields['contenido'].value
                      : ''
                  ),
    imagen:       img(fields['imagen']),
    boton:        url(fields['boton']),
    distribucion: fields['distribucion']?.type === 'ezselection'
                    ? fields['distribucion'].value
                    : [],
  };
}

export function extractMiniatura4Items(
  fields: Record<string, CMSField>
): Miniatura4Item[] {
  const items: Miniatura4Item[] = [];
  for (let i = 1; i <= 4; i++) {
    const titulo = str(fields[`titulo_item${i}`]);
    if (!titulo) break;
    items.push({
      titulo,
      descripcion: str(fields[`descripcion_item${i}`]),
      imagen:      img(fields[`imagen_item${i}`]),
      url:         url(fields[`url_texto_enlace_item${i}`]),
    });
  }
  return items;
}

export function extractMiniatura3Items(
  fields: Record<string, CMSField>
): Miniatura3Item[] {
  const items: Miniatura3Item[] = [];
  for (let i = 1; i <= 3; i++) {
    const titulo = str(fields[`titulo_item${i}`]);
    if (!titulo) break;
    items.push({
      titulo,
      descripcion: str(fields[`descripcion_item${i}`]),
      imagen:      img(fields[`imagen_item${i}`]),
    });
  }
  return items;
}

export function extractBannerMediosItems(
  fields: Record<string, CMSField>
): BannerMediosItem[] {
  const items: BannerMediosItem[] = [];
  for (let i = 1; i <= 6; i++) {
    const imagen = img(fields[`imagen_${i}`]);
    if (!imagen) break;
    items.push({
      imagen,
      url: url(fields[`imagen_url_${i}`]),
    });
  }
  return items;
}

// ─── Product page ─────────────────────────────────────────────────────────────

export async function fetchProductPage(locationId: string | number, lang: string = LANG): Promise<ProductPageData | null> {
  const data = await fetchLocation(locationId, 20, 2, lang);

  const resumenNode        = data.children.find(c => c.content.contentTypeIdentifier === 'resumen');
  const estructuraNode     = data.children.find(c => c.content.contentTypeIdentifier === 'estructura_navegacion_producto');
  const seccionResumenNode = data.children.find(c => c.content.contentTypeIdentifier === 'seccion_resumen');

  if (!resumenNode || !estructuraNode) return null;

  const resumenChildren = resumenNode.children ?? [];
  const seccionChildren = seccionResumenNode?.children ?? [];

  const cabeceraNode = resumenChildren.find(c => c.content.contentTypeIdentifier === 'cabecera_seguro');
  if (!cabeceraNode) return null;

  const cf = cabeceraNode.content.fields;
  const imgFieldUri = (key: string): string | null => {
    const f = cf[key];
    if (!f || f.type !== 'ezimage' || !f.value) return null;
    return absoluteUri((f.value as { uri: string }).uri);
  };

  const cabecera: CabeceraSeguroData = {
    textoPrincipal: str(cf['texto_principal']),
    pretitulo:      str(cf['pretitulo']),
    imagenMobile:   imgFieldUri('imagen_cabecera_mobile'),
    imagenLg:       imgFieldUri('imagen_cabecera_lg'),
  };

  const ef = estructuraNode.content.fields;
  const structuredData: EstructuraNavData = {
    titulo:      str(ef['titulo']),
    description: str(ef['description']),
    offersPrice: str(ef['offers_price']),
    ratingValue: str(ef['ratingvalue']),
    ratingCount: str(ef['ratingcount']),
  };

  const iconoTextoNode = resumenChildren.find(c => c.content.contentTypeIdentifier === 'icono_texto');
  let iconoTexto: IconoTextoData | null = null;
  if (iconoTextoNode) {
    const itf = iconoTextoNode.content.fields;
    iconoTexto = {
      subtitulo:    str(itf['subtitulo']),
      contenido:    str(itf['contenido']),
      urlContenido: url(itf['url_cotenido']),
      imagen:       img(itf['imagen']),
    };
  }

  const miniatura4Node = seccionChildren.find(c => c.content.contentTypeIdentifier === 'miniatura_4');
  let caracteristicas: CaracteristicasData | null = null;
  if (miniatura4Node) {
    const m4f = miniatura4Node.content.fields;
    const imgPrincipalField = m4f['imagen_principal'];
    const imgPrincipalUri = imgPrincipalField?.type === 'ezimage' && imgPrincipalField.value
      ? absoluteUri((imgPrincipalField.value as { uri: string }).uri)
      : null;

    const items: CaracteristicasData['items'] = [];
    for (let i = 1; i <= 4; i++) {
      const titulo = str(m4f[`titulo_item${i}`]);
      if (!titulo) break;
      items.push({
        titulo,
        descripcion: str(m4f[`descripcion_item${i}`]),
        url:         url(m4f[`url_texto_enlace_item${i}`]),
      });
    }

    caracteristicas = {
      pretitulo:       str(m4f['pretitulo']),
      titulo:          str(m4f['titulo']),
      imagenPrincipal: imgPrincipalUri,
      items,
    };
  }

  const tablaNode = seccionChildren.find(c => c.content.contentTypeIdentifier === 'tabla_comparativa');
  let tablaComparativa: TablaComparativaBasicData | null = null;
  if (tablaNode) {
    const tf = tablaNode.content.fields;
    tablaComparativa = {
      pretitulo: str(tf['pretitulo']),
      titulo:    str(tf['titulo']),
      price:     structuredData.offersPrice,
    };
  }

  const ventajasNode = resumenChildren.find(c => c.content.contentTypeIdentifier === 'miniatura_3');
  let ventajas: Miniatura3Item[] | null = null;
  if (ventajasNode) {
    ventajas = extractMiniatura3Items(ventajasNode.content.fields);
  }

  return {
    cabecera,
    structuredData,
    iconoTexto,
    caracteristicas,
    tablaComparativa,
    ventajas,
  };
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const _footerCaches = new Map<string, FooterData>();

export async function fetchFooterContent(lang: string = LANG): Promise<FooterData> {
  if (_footerCaches.has(lang)) return _footerCaches.get(lang)!;

  const [rootData, submenusData, legalLeftData, legalRightData] = await Promise.all([
    fetchLocation(FOOTER_LOCATION_ID,          50, undefined, lang),
    fetchLocation(FOOTER_SUBMENUS_LOCATION_ID, 80, undefined, lang),
    fetchLocation(FOOTER_LEGAL_LEFT_ID,        50, undefined, lang),
    fetchLocation(FOOTER_LEGAL_RIGHT_ID,       50, undefined, lang),
  ]);

  const submenuMap = new Map<number, FooterSubItem>(
    submenusData.children.map((child) => {
      const f = child.content.fields;
      const urlExt = f['url_externa']?.type === 'ezurl'
        ? (f['url_externa'].value as { url: string | null; text: string | null })
        : null;
      return [
        child.content.id,
        {
          locationId: child.locationId,
          contentId:  child.content.id,
          nombre:     str(f['nombre']) || child.content.name,
          url:        urlExt?.url ?? null,
        },
      ];
    })
  );

  const columnChildren = rootData.children.filter(
    (c) => c.content.contentTypeIdentifier === 'enlaces'
  );

  const columns: FooterColumn[] = columnChildren.map((child) => {
    const f = child.content.fields;
    const relMultiple = f['relacion_multiple']?.value as string | undefined;
    const submenuIds  = relMultiple
      ? relMultiple.split(',').map(Number).filter(Boolean)
      : [];

    return {
      title:      str(f['nombre']) || child.content.name,
      submenuIds,
      items:      submenuIds
                    .map((id) => submenuMap.get(id))
                    .filter((s): s is FooterSubItem => s !== undefined),
    };
  });

  const toLegalItem = (child: CMSChild): FooterSubItem => {
    const f = child.content.fields;
    const urlExt = f['url_externa']?.type === 'ezurl'
      ? (f['url_externa'].value as { url: string | null; text: string | null })
      : null;
    return {
      locationId: child.locationId,
      contentId:  child.content.id,
      nombre:     child.content.name,
      url:        urlExt?.url ?? null,
    };
  };

  const footerResult: FooterData = {
    columns,
    legalLeft:  legalLeftData.children.map(toLegalItem),
    legalRight: legalRightData.children.map(toLegalItem),
  };

  _footerCaches.set(lang, footerResult);
  return footerResult;
}
