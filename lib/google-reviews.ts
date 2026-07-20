import { site } from "@/lib/site";

// Reseñas reales desde la ficha de Google (Places API New).
// Requiere GOOGLE_PLACES_API_KEY. Si no está configurada o falla la llamada,
// devuelve null y la web muestra solo la calificación general (nunca inventa).

export type GoogleReview = {
  id: string;
  author: string;
  photo: string | null;
  profileUrl: string | null;
  rating: number;
  text: string;
  relativeTime: string;
};

export type GoogleReviewsData = {
  rating: number;
  total: number;
  reviews: GoogleReview[];
};

type PlacesReview = {
  name?: string;
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
};

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${site.google.placeId}?languageCode=es&regionCode=UY`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        // Se refresca cada hora (respeta los límites de cacheo de Google).
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return null;

    const data = (await res.json()) as {
      rating?: number;
      userRatingCount?: number;
      reviews?: PlacesReview[];
    };

    const reviews: GoogleReview[] = (data.reviews ?? [])
      .map((r, i) => ({
        id: r.name ?? `review-${i}`,
        author: r.authorAttribution?.displayName ?? "Cliente de Google",
        photo: r.authorAttribution?.photoUri ?? null,
        profileUrl: r.authorAttribution?.uri ?? null,
        rating: r.rating ?? 0,
        text: (r.text?.text ?? r.originalText?.text ?? "").trim(),
        relativeTime: r.relativePublishTimeDescription ?? "",
      }))
      .filter((r) => r.text.length > 0);

    return {
      rating: data.rating ?? site.google.rating,
      total: data.userRatingCount ?? site.google.reviewCount,
      reviews,
    };
  } catch {
    return null;
  }
}
