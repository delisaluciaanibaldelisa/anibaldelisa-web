import { mapsEmbedUrl } from "@/lib/site";

// Embed de Google Maps sin API key (usa el modo output=embed).
export default function MapEmbed({
  query,
  title,
}: {
  query: string;
  title: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 aspect-[4/3] w-full">
      <iframe
        title={`Mapa: ${title}`}
        src={mapsEmbedUrl(query)}
        className="w-full h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
