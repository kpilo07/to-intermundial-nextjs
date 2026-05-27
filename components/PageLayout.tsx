import { fetchMenuContent, fetchFooterContent, LOCALE_TO_CMS_LANG } from '@/lib/cms';
import NavBar from './NavBar';
import Footer from './Footer';
import type { ReactNode } from 'react';

interface Props {
  lang?: string;
  children: ReactNode;
}

export default async function PageLayout({ lang, children }: Props) {
  const cmsLang = lang ? (LOCALE_TO_CMS_LANG[lang] ?? lang) : undefined;

  const [menu, footer] = await Promise.all([
    fetchMenuContent(cmsLang),
    fetchFooterContent(cmsLang),
  ]);

  return (
    <>
      <NavBar menu={menu} />
      {children}
      <Footer footer={footer} />
    </>
  );
}
