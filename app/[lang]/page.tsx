import type { Metadata } from 'next';
import { fetchHomeContent, LOCALE_TO_CMS_LANG } from '@/lib/cms';
import PageLayout from '@/components/PageLayout';
import SectionRenderer from '@/components/SectionRenderer';

export function generateStaticParams() {
  return [
    { lang: 'it' },
    { lang: 'pt' },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const cmsLang = LOCALE_TO_CMS_LANG[lang] ?? lang;
  const homeData = await fetchHomeContent(cmsLang);
  const title = homeData.parent.content.fields['name']?.type === 'ezstring'
    ? homeData.parent.content.fields['name'].value
    : 'Intermundial – Seguros de Viaje';
  return { title };
}

export default async function LocalizedHomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const cmsLang = LOCALE_TO_CMS_LANG[lang] ?? lang;

  const homeData = await fetchHomeContent(cmsLang);
  const { children } = homeData;

  return (
    <PageLayout lang={lang}>
      <main>
        {children.map((section) => (
          <SectionRenderer key={section.locationId} section={section} />
        ))}
      </main>
    </PageLayout>
  );
}
