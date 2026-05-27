// ─── Field value types ──────────────────────────────────────────────────────

export interface ImageValue {
  uri: string;
  alt: string;
  width: string;
  height: string;
  fileName: string;
}

export interface UrlValue {
  url: string | null;
  text: string | null;
}

// ─── Generic field container ─────────────────────────────────────────────────

export type CMSField =
  | { type: 'ezstring';       value: string }
  | { type: 'ezboolean';      value: boolean }
  | { type: 'ezselection';    value: number[] }
  | { type: 'ezimage';        value: ImageValue | null }
  | { type: 'ezurl';          value: UrlValue }
  | { type: 'ezxmltext';      value: string }
  | { type: 'ezobjectrelation'; value: string }
  | { type: 'ezkeyword';      value: string[] }
  | { type: 'ezpage';         value: string };

// ─── Content ─────────────────────────────────────────────────────────────────

export type ContentTypeIdentifier =
  | 'seccion_render'
  | 'imagen_texto'
  | 'seccion'
  | 'relacion_galeria_card_3_elementos'
  | 'block_widget'
  | 'miniatura_4'
  | 'carrusel_container'
  | 'miniatura_3'
  | 'preguntas_frecuentes'
  | 'banner_medios'
  | 'folder'
  | string;

export interface CMSContent {
  id: number;
  name: string;
  contentTypeIdentifier: ContentTypeIdentifier;
  lang: string;
  publishedAt: string;
  modifiedAt: string;
  mainLocationId: string;
  fields: Record<string, CMSField>;
}

// ─── Child / Parent location ─────────────────────────────────────────────────

export interface CMSChild {
  locationId: number;
  depth: number;
  pathString: string;
  content: CMSContent;
  /** Presente cuando se usa &depth=2 en la query (hijos anidados) */
  children?: CMSChild[];
}

// ─── Header (cabecera_block) ──────────────────────────────────────────────────

export interface HeaderTag {
  title:    string;
  iconUri:  string;
  iconAlt:  string;
}

export interface HeaderData {
  titulo:      string;
  descripcion: string;
  bgL:         string | null;
  bgM:         string | null;
  bgS:         string | null;
  bgXs:        string | null;
  bgPosition:  string;
  tags:        HeaderTag[];
}

// ─── Root API response ───────────────────────────────────────────────────────

export interface CMSHomeResponse {
  locationId: number;
  lang: string;
  parent: {
    depth: number;
    pathString: string;
    content: CMSContent;
  };
  total: number;
  offset: number;
  limit: number;
  children: CMSChild[];
}

// ─── Typed helpers for commonly used sections ─────────────────────────────────

export interface ImagenTextoFields {
  nombre:              string;
  titulo:              string;
  pretitulo:           string;
  contenido:           string;
  imagen:              ImageValue | null;
  boton:               UrlValue;
  distribucion:        number[];
}

export interface Miniatura4Item {
  titulo:       string;
  descripcion:  string;
  imagen:       ImageValue | null;
  url:          UrlValue;
}

export interface BannerMediosItem {
  imagen: ImageValue;
  url:    UrlValue;
}

export interface Miniatura3Item {
  titulo:      string;
  descripcion: string;
  imagen:      ImageValue | null;
}

// ─── Menu ─────────────────────────────────────────────────────────────────────

export interface MenuItem {
  locationId:  number;
  contentId:   number;
  nombre:      string;
  url:         string | null;
  iconUrl:     string | null;
  clase:       string;
  contenido:   string;
  submenuIds:  number[];
}

export interface MenuData {
  topBarLeft:  MenuItem[];
  topBarRight: MenuItem[];
  mainNav:     MenuItem[];
  submenus:    MenuItem[];
}

// ─── Product page (seguros-de-viaje/seguro-XXX) ──────────────────────────────

export interface CabeceraSeguroData {
  textoPrincipal: string;
  pretitulo:      string;
  imagenMobile:   string | null;
  imagenLg:       string | null;
}

export interface EstructuraNavData {
  titulo:       string;
  description:  string;
  offersPrice:  string;
  ratingValue:  string;
  ratingCount:  string;
}

export interface IconoTextoData {
  subtitulo:    string;
  contenido:    string;
  urlContenido: UrlValue;
  imagen:       ImageValue | null;
}

export interface CaracteristicaItem {
  titulo:       string;
  descripcion:  string;
  url:          UrlValue;
}

export interface CaracteristicasData {
  pretitulo:       string;
  titulo:          string;
  imagenPrincipal: string | null;
  items:           CaracteristicaItem[];
}

export interface TablaComparativaBasicData {
  pretitulo: string;
  titulo:    string;
  price:     string;
}

export interface ProductPageData {
  cabecera:         CabeceraSeguroData;
  structuredData:   EstructuraNavData;
  iconoTexto:       IconoTextoData | null;
  caracteristicas:  CaracteristicasData | null;
  tablaComparativa: TablaComparativaBasicData | null;
  ventajas:         Miniatura3Item[] | null;
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export interface FooterSubItem {
  locationId: number;
  contentId:  number;
  nombre:     string;
  url:        string | null;
}

export interface FooterColumn {
  title:       string;
  submenuIds:  number[];
  items:       FooterSubItem[];
}

export interface FooterData {
  columns:    FooterColumn[];
  legalLeft:  FooterSubItem[];
  legalRight: FooterSubItem[];
}
