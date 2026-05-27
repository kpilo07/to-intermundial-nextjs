import type { Metadata } from 'next';
import { fetchHomeContent } from '@/lib/cms';
import PageLayout from '@/components/PageLayout';
import SectionRenderer from '@/components/SectionRenderer';

export async function generateMetadata(): Promise<Metadata> {
  const homeData = await fetchHomeContent();
  const title = homeData.parent.content.fields['name']?.type === 'ezstring'
    ? homeData.parent.content.fields['name'].value
    : 'Intermundial – Seguros de Viaje';
  return { title };
}

export default async function HomePage() {
  const homeData = await fetchHomeContent();
  const { children } = homeData;

  return (
    <PageLayout>
      <main>
        {children.map((section) => (
          <SectionRenderer key={section.locationId} section={section} />
        ))}
      </main>
    </PageLayout>
  );
}
