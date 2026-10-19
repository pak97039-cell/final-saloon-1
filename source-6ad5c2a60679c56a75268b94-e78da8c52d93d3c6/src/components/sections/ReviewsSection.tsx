import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { formatShortDate } from '../../lib/format';
import { SectionHeading } from '../ui/SectionHeading';

export const ReviewsSection: React.FC = () => {
  const { reviews } = useSalon();

  // Compute live average rating from reviews array
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
        ).toFixed(1)
      : '5.0';

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#F3E8E0] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header with Live Rating Summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E2D8]">
          <SectionHeading
            eyebrow="Guest Impressions"
            title="Words From Our"
            accent="Sanctuary Guests"
            subtitle="Authentic testimonials from brides, professionals, and families across Islamabad and Rawalpindi."
          />

          {/* Average Rating Scorecard */}
          <div className="card-luxe p-5 flex items-center gap-4 shrink-0 shadow-soft-1">
            <div className="font-serif text-4xl text-[#1A1A1A] font-medium leading-none tabular-price">
              {averageRating}
            </div>
            <div className="space-y-1">
              <div
                className="flex items-center gap-1 text-[#D4AF37]"
                role="img"
                aria-label={`${averageRating} out of 5 stars based on verified guest visits`}
              >
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                ))}
              </div>
              <span className="text-[11px] text-[#8C6F66] block uppercase tracking-wider font-semibold">
                {reviews.length} Verified Guest Visits
              </span>
            </div>
          </div>
        </div>

        {/* 6 Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="card-luxe p-7 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center gap-1 text-[#D4AF37]"
                    role="img"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                    ))}
                  </div>

                  {review.verifiedVisit && (
                    <span className="inline-flex items-center gap-1 text-[11px] uppercase font-semibold tracking-wider text-[#8A6A2F]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#8A6A2F]" />
                      <span>Verified Visit</span>
                    </span>
                  )}
                </div>

                {/* Testimonial Quote */}
                <p className="font-serif text-base sm:text-lg text-[#1A1A1A] italic leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author & Treatment Footer */}
              <div className="pt-4 border-t border-[#E8E2D8] flex items-end justify-between text-xs">
                <div>
                  <h4 className="font-sans font-semibold text-[#1A1A1A] text-sm">
                    {review.author}
                  </h4>
                  <p className="text-[#8A6A2F] text-[11px] font-medium mt-0.5">
                    {review.serviceName}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-[#1A1A1A]/70 font-medium block">
                    {review.city}
                  </span>
                  <span className="text-[10px] text-[#8C6F66] block mt-0.5">
                    {formatShortDate(review.date)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sub-text quote */}
        <div className="text-center pt-2">
          <p className="text-xs text-[#8C6F66] font-serif italic">
            Guest reviews collected following private suite appointments in F-6 Markaz, Islamabad.
          </p>
        </div>
      </div>
    </section>
  );
};
