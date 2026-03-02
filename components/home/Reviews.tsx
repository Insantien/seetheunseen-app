import { SectionHeader } from "@/components/ui/SectionHeader";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Priya & Rahul Mehta",
    location: "Mumbai",
    tour: "Kerala Backwaters & Ayurveda Retreat",
    rating: 5,
    text: "Absolutely flawless from start to finish. Every detail was thought of before we even realised we needed it. The houseboat was stunning, the Ayurveda treatments genuinely transformative. We've already booked our next trip with them.",
    date: "January 2025",
    avatar: "PM",
  },
  {
    name: "James & Catherine Holbrook",
    location: "London, UK",
    tour: "Rajasthan: Palace Circuit",
    rating: 5,
    text: "We've travelled extensively, but See the Unseen opened up India to us in a way we never expected. Private heritage tours, rooms in genuine palaces, and a guide who felt like a friend by day three. World-class.",
    date: "December 2024",
    avatar: "JH",
  },
  {
    name: "Akira Tanaka",
    location: "Tokyo, Japan",
    tour: "Bhutan: Thunder Dragon Odyssey",
    rating: 5,
    text: "Bhutan is a special place, and this itinerary did it full justice. The team handled every permit, every logistics challenge invisibly. I just experienced — which is exactly what I wanted.",
    date: "November 2024",
    avatar: "AT",
  },
  {
    name: "Nandita Krishnamurthy",
    location: "Bengaluru",
    tour: "Japan Cherry Blossom Circuit",
    rating: 5,
    text: "Cherry blossom season in Japan with my daughter — a dream I'd had for 20 years. They made it real, and exceeded every expectation. The attention to timing, to quiet moments, to the extraordinary hotels they chose.",
    date: "April 2024",
    avatar: "NK",
  },
];

export default function Reviews() {
  const avgRating = 4.9;
  const totalReviews = 2400;

  return (
    <section className="py-20 md:py-28 bg-brand-light">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12">
          <SectionHeader
            eyebrow="Traveller Stories"
            title="What Our Guests Say"
            align="left"
            className="mb-0 flex-1"
          />
          {/* Rating summary */}
          <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-card shrink-0">
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-brand-golden text-brand-golden" />
                ))}
              </div>
              <p className="font-playfair text-3xl font-bold text-brand-dark leading-none">{avgRating}</p>
              <p className="text-xs font-sans text-brand-grey mt-1">{totalReviews.toLocaleString()}+ reviews</p>
            </div>
            <div className="w-px h-12 bg-gray-200 mx-2" />
            <div className="space-y-1">
              {[5, 4, 3].map((stars) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-xs font-sans text-brand-grey w-4">{stars}★</span>
                  <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-golden rounded-full"
                      style={{ width: stars === 5 ? "92%" : stars === 4 ? "6%" : "2%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {REVIEWS.map((review) => (
            <div key={review.name} className="bg-white rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-shadow">
              {/* Rating + quote icon */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-brand-golden text-brand-golden" />
                  ))}
                </div>
                <Quote size={24} className="text-brand-orange/20 shrink-0" />
              </div>

              {/* Review text */}
              <p className="font-lora text-brand-grey text-sm leading-relaxed mb-5 italic">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-orange to-brand-coral flex items-center justify-center text-white font-bold text-sm font-sans shrink-0">
                  {review.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans font-bold text-brand-dark text-sm">{review.name}</p>
                  <p className="font-sans text-xs text-brand-grey">{review.location}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-sans text-[10px] text-brand-orange font-semibold uppercase tracking-wide">{review.tour}</p>
                  <p className="font-sans text-[10px] text-brand-grey">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
