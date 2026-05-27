'use client';

import { useState, useEffect } from 'react';
import type { MenuData, MenuItem } from '@/lib/types';

interface Props {
  menu: MenuData;
}

export default function NavBar({ menu }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const submenuMap = new Map<number, MenuItem>(
    menu.submenus.map((s) => [s.contentId, s])
  );

  function getSubItems(navItem: MenuItem): MenuItem[] {
    return navItem.submenuIds
      .map((id) => submenuMap.get(id))
      .filter((s): s is MenuItem => s !== undefined);
  }

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-low">

      {/* ── Top utility bar (solo escritorio) ────────────────────────── */}
      <div className="hidden md:block bg-surface-gray2 border-b border-stroke-low">
        <div className="max-w-[1200px] mx-auto px-24 flex items-center justify-between h-[36px]">

          {/* Izquierda: Particulares | Empresas */}
          <nav aria-label="Audiencia" className="flex items-center gap-0">
            {menu.topBarLeft.map((item, i) => (
              <span key={item.locationId} className="flex items-center">
                {i > 0 && <span className="text-stroke-mid text-12 px-8">|</span>}
                <a
                  href={item.url ?? '#'}
                  className="text-12 text-content-mid hover:text-semantic-primary transition-colors font-weight-medium"
                >
                  {item.nombre}
                </a>
              </span>
            ))}
          </nav>

          {/* Derecha: Área cliente | Contacto | … */}
          <nav aria-label="Utilidades" className="flex items-center gap-16">
            {menu.topBarRight.map((item) => (
              <a
                key={item.locationId}
                href={item.url ?? '#'}
                target={item.url?.startsWith('http') ? '_blank' : undefined}
                rel={item.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 text-12 text-content-mid hover:text-semantic-primary transition-colors"
              >
                {item.iconUrl && (
                  <img src={item.iconUrl} alt="" width="14" height="14" className="opacity-60" />
                )}
                {item.nombre}
              </a>
            ))}
          </nav>

        </div>
      </div>

      {/* ── Nav principal ──────────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-24">
        <div className="flex items-center justify-between h-[64px] gap-16">

          {/* Logo */}
          <a href="/" className="flex-shrink-0" aria-label="Intermundial — Ir al inicio">
            <span className="text-22 font-weight-medium text-semantic-primary tracking-0-3 leading-28">
              Intermundial
            </span>
          </a>

          {/* ── Nav items escritorio ──────────────────────────────────── */}
          <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-4 flex-1">
            {menu.mainNav.map((navItem) => {
              const subItems = getSubItems(navItem);
              const hasDropdown = subItems.length > 0;
              return (
                <div key={navItem.locationId} className="relative group">

                  {/* Ítem principal */}
                  <a
                    href={navItem.url ?? '#'}
                    className="flex items-center gap-4 px-16 py-8 rounded-4 text-14 font-weight-medium text-content-high hover:text-semantic-primary hover:bg-surface-blue1 transition-colors"
                  >
                    {navItem.nombre}
                    {hasDropdown && (
                      <svg
                        className="w-[14px] h-[14px] transition-transform duration-200 group-hover:rotate-180"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </a>

                  {/* Dropdown */}
                  {hasDropdown && (
                    <div
                      className="absolute top-[calc(100%+4px)] left-0 min-w-[280px] bg-white rounded-8 shadow-medium border border-stroke-low py-8 opacity-0 invisible translate-y-[-6px] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-out z-50"
                      role="menu"
                    >
                      {navItem.contenido && (
                        <div className="px-16 pb-8 mb-4 border-b border-stroke-low">
                          <p className="text-12 text-content-low leading-18">{navItem.contenido}</p>
                        </div>
                      )}
                      {subItems.map((sub) => (
                        sub.url ? (
                          <a
                            key={sub.locationId}
                            href={sub.url}
                            role="menuitem"
                            className="flex flex-col px-16 py-10 hover:bg-surface-blue1 transition-colors group/sub"
                          >
                            <span className="text-14 font-weight-medium text-content-high group-hover/sub:text-semantic-primary leading-20">
                              {sub.nombre}
                            </span>
                            {sub.contenido && (
                              <span className="text-12 text-content-low leading-18 mt-2">
                                {sub.contenido}
                              </span>
                            )}
                          </a>
                        ) : (
                          <span
                            key={sub.locationId}
                            role="menuitem"
                            aria-disabled="true"
                            className="flex flex-col px-16 py-10 opacity-50 cursor-default select-none"
                          >
                            <span className="text-14 font-weight-medium text-content-high leading-20">
                              {sub.nombre}
                            </span>
                            {sub.contenido && (
                              <span className="text-12 text-content-low leading-18 mt-2">
                                {sub.contenido}
                              </span>
                            )}
                          </span>
                        )
                      ))}
                    </div>
                  )}

                </div>
              );
            })}
          </nav>

          {/* CTA escritorio */}
          <a
            href="/seguros-de-viaje"
            className="hidden md:inline-flex items-center gap-8 px-24 py-12 rounded-8 bg-semantic-primary text-white text-14 font-weight-medium shadow-low hover:opacity-90 active:opacity-80 transition-opacity whitespace-nowrap flex-shrink-0"
          >
            Comparar seguros
          </a>

          {/* ── Hamburger (móvil) ─────────────────────────────────────── */}
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-[40px] h-[40px] rounded-4 text-content-high hover:bg-surface-gray2 transition-colors flex-shrink-0"
          >
            {mobileOpen ? (
              <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* ── Menú móvil ──────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-stroke-low bg-white overflow-y-auto max-h-[80vh]"
          aria-label="Menú móvil"
        >
          <div className="max-w-[1200px] mx-auto px-24 py-16 flex flex-col">

            {/* Items principales con acordeón */}
            {menu.mainNav.map((navItem) => {
              const subItems = getSubItems(navItem);
              return (
                <details key={navItem.locationId} className="group/detail border-b border-stroke-low last:border-0">
                  <summary className="flex items-center justify-between py-14 cursor-pointer list-none select-none">
                    <a
                      href={navItem.url ?? '#'}
                      className="text-16 font-weight-medium text-content-high hover:text-semantic-primary transition-colors"
                      onClick={(e) => { e.stopPropagation(); closeMenu(); }}
                    >
                      {navItem.nombre}
                    </a>
                    {subItems.length > 0 && (
                      <svg
                        className="w-[16px] h-[16px] text-content-mid transition-transform duration-200 group-open/detail:rotate-180 flex-shrink-0"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </summary>

                  {subItems.length > 0 && (
                    <div className="pb-8 pl-16 flex flex-col gap-2">
                      {subItems.map((sub) => (
                        sub.url ? (
                          <a
                            key={sub.locationId}
                            href={sub.url}
                            onClick={closeMenu}
                            className="flex flex-col py-10 border-b border-stroke-low last:border-0 hover:text-semantic-primary transition-colors"
                          >
                            <span className="text-14 font-weight-medium text-content-high">{sub.nombre}</span>
                            {sub.contenido && (
                              <span className="text-12 text-content-low leading-18 mt-1">{sub.contenido}</span>
                            )}
                          </a>
                        ) : (
                          <span
                            key={sub.locationId}
                            className="flex flex-col py-10 border-b border-stroke-low last:border-0 opacity-50 cursor-default select-none"
                          >
                            <span className="text-14 font-weight-medium text-content-high">{sub.nombre}</span>
                            {sub.contenido && (
                              <span className="text-12 text-content-low leading-18 mt-1">{sub.contenido}</span>
                            )}
                          </span>
                        )
                      ))}
                    </div>
                  )}
                </details>
              );
            })}

            {/* Top bar items en móvil */}
            <div className="mt-16 pt-16 border-t border-stroke-low grid grid-cols-2 gap-12">
              {[...menu.topBarLeft, ...menu.topBarRight].map((item) => (
                <a
                  key={item.locationId}
                  href={item.url ?? '#'}
                  onClick={closeMenu}
                  className="flex items-center gap-6 text-14 text-content-mid hover:text-semantic-primary transition-colors py-4"
                >
                  {item.iconUrl && (
                    <img src={item.iconUrl} alt="" width="14" height="14" className="opacity-50" />
                  )}
                  {item.nombre}
                </a>
              ))}
            </div>

            {/* CTA móvil */}
            <a
              href="/seguros-de-viaje"
              onClick={closeMenu}
              className="mt-24 mb-8 flex items-center justify-center gap-8 px-24 py-14 rounded-8 bg-semantic-primary text-white text-16 font-weight-medium text-center"
            >
              Comparar seguros
            </a>

          </div>
        </div>
      )}

    </header>
  );
}
