'use client';

interface Country {
  label: string;
  url: string;
  selected?: boolean;
}

export default function CountrySelector({ countries }: { countries: Country[] }) {
  return (
    <div className="relative w-[240px] bg-transparent text-white border border-white rounded-8 max-xs:w-full">
      <select
        className="w-full bg-transparent text-white outline-none cursor-pointer px-16 py-12 pr-40 appearance-none font-helvetica-now-regular font-weight-regular text-14 leading-20"
        defaultValue={countries.find((c) => c.selected)?.url ?? countries[0]?.url}
        onChange={(e) => { window.location.href = e.target.value; }}
      >
        {countries.map((c) => (
          <option key={c.url} className="text-content-high" value={c.url}>
            {c.label}
          </option>
        ))}
      </select>
      <div className="absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
