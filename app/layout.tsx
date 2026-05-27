import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Intermundial – Seguros de Viaje',
  description: 'Seguros de viaje para particulares y empresas. Líderes en cobertura y experiencia digital.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
