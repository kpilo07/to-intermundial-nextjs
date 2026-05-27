import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchProductPage } from '@/lib/cms';
import PageLayout from '@/components/PageLayout';
import CabeceraSeguro         from '@/components/sections/product/CabeceraSeguro';
import ProductIconoTexto      from '@/components/sections/product/ProductIconoTexto';
import ProductCaracteristicas from '@/components/sections/product/ProductCaracteristicas';
import ProductPricingCTA      from '@/components/sections/product/ProductPricingCTA';
import ProductVentajas        from '@/components/sections/product/ProductVentajas';

const TOTALTRAVEL_ID = process.env.CMS_TOTALTRAVEL_LOCATION_ID ?? '123';

export async function generateMetadata(): Promise<Metadata> {
  const product = await fetchProductPage(TOTALTRAVEL_ID);
  if (!product) return {};
  return {
    title: product.structuredData.titulo
      ? `${product.structuredData.titulo} | Intermundial`
      : 'Seguro de viaje internacional Totaltravel | Intermundial',
    description: product.structuredData.description ||
      'Seguro de viaje internacional Totaltravel. Cobertura médica hasta 5.000.000€, 35 causas de anulación y asistencia 24h.',
  };
}

export default async function TotaltravelPage() {
  const product = await fetchProductPage(TOTALTRAVEL_ID);

  if (!product) notFound();

  const { cabecera, structuredData, iconoTexto, caracteristicas, tablaComparativa, ventajas } = product;

  const schemaOrg = JSON.stringify({
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: structuredData.titulo,
    description: structuredData.description,
    brand: 'Intermundial',
    offers: {
      '@type': 'Offer',
      url: 'https://www.intermundial.es/seguros-de-viaje/seguro-totaltravel',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      price: structuredData.offersPrice,
    },
    aggregateRating: structuredData.ratingValue
      ? {
          '@type': 'AggregateRating',
          ratingValue: structuredData.ratingValue,
          reviewCount: structuredData.ratingCount,
          bestRating: '5',
          worstRating: '1',
        }
      : undefined,
  });

  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaOrg }}
      />

      {/* 1. Cabecera */}
      <CabeceraSeguro cabecera={cabecera} structuredData={structuredData} />

      {/* 2. Promo eSIM / IconoTexto */}
      {iconoTexto && iconoTexto.subtitulo && (
        <ProductIconoTexto data={iconoTexto} />
      )}

      {/* 3. Características */}
      {caracteristicas && caracteristicas.items.length > 0 && (
        <ProductCaracteristicas data={caracteristicas} />
      )}

      {/* 4. Pricing CTA */}
      {tablaComparativa && (
        <ProductPricingCTA data={tablaComparativa} seguroNombre="Totaltravel" />
      )}

      {/* 5. Ventajas */}
      {ventajas && ventajas.length > 0 && (
        <ProductVentajas items={ventajas} />
      )}

      <div className="pb-[64px]" />
    </PageLayout>
  );
}
