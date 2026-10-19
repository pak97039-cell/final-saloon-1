import React from 'react';
import { MapPin, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';
import { SectionHeading } from '../ui/SectionHeading';

export const HomeSalonSection: React.FC = () => {
  const { openBooking } = useSalon();

  const steps = [
    {
      number: '01',
      title: 'Select Ritual & Residence',
      description: 'Choose your desired hair, makeup, or bridal service and provide your Islamabad or Rawalpindi address.',
    },
    {
      number: '02',
      title: 'Mobile Suite Dispatch',
      description: 'Our senior all-female artist team arrives 15 minutes early equipped with illuminated vanity mirrors and sterilized kits.',
    },
    {
      number: '03',
      title: 'Private Home Transformation',
      description: 'Experience true five-star atelier luxury in the comfort and absolute privacy of your own bedroom or dressing room.',
    },
  ];

  const coveredAreas = [
    'Sector F-6, F-7, F-8, F-10 & F-11',
    'Sector E-7, E-11 & Margalla Enclave',
    'Chak Shahzad, Bani Gala & Park View',
    'DHA Islamabad (Phases 1, 2, 5)',
    'Bahria Town Islamabad / Rawalpindi',
    'Rawalpindi Cantt, Saddar & Askari',
  ];

  const hygieneProtocols = [
    'Hospital-grade autoclave pouches opened fresh before your eyes',
    'Full sanitization of hot tools, curling irons & vanity cases',
    'Single-use disposable capes, spatulas, sponges & cotton towels',
    'Calibrated high-CRI LED daylight vanity mirrors provided',
  ];

  return (
    <section id="home-salon" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E2D8]">
          <SectionHeading
            eyebrow="Mobile Atelier Experience"
            title="At-Home"
            accent="Salon Concierge"
            subtitle="Bring the private suite experience to your residence. Ideal for weddings, family dinners, postpartum recovery, and unhurried home pampering."
          />

          <button
            type="button"
            onClick={() => openBooking({ mode: 'home' })}
            className="btn-outline text-xs min-h-[48px] px-6 shrink-0"
          >
            <span>Book In-Home Ritual</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8A6A2F]" />
          </button>
        </div>

        {/* 3-Step How It Works Grid */}
        <div className="space-y-4">
          <h3 className="eyebrow-text text-[#8A6A2F]">
            How The Concierge Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="card-luxe p-8 space-y-4 relative"
              >
                <span className="font-serif text-3xl sm:text-4xl text-[#8A6A2F] font-medium block">
                  {step.number}
                </span>
                <h4 className="font-serif text-xl text-[#1A1A1A]">{step.title}</h4>
                <p className="text-xs text-[#1A1A1A]/75 font-sans leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Box: Service Area + Sterilization Protocol */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Service Area */}
          <div className="card-luxe p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#E8E2D8]">
                <div className="w-8 h-8 rounded-xs bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#8A6A2F]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-[#1A1A1A]">Coverage Sectors</h4>
                  <p className="text-[11px] text-[#8C6F66] font-sans">
                    Islamabad Urban &amp; Rawalpindi Cantt Concierge
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#1A1A1A]/75 font-sans leading-relaxed">
                Our mobile squads serve prime residential communities across the twin cities with punctual chauffeur service:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {coveredAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xs bg-[#FAF8F5] border border-[#E8E2D8] text-xs text-[#1A1A1A]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8A6A2F]" />
                    <span className="font-medium text-[11px]">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-[#8C6F66] italic border-t border-[#E8E2D8] pt-4">
              * Outer sector transport fee is transparently factored into home service packages.
            </p>
          </div>

          {/* Sterilization Protocol */}
          <div className="card-luxe p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#E8E2D8]">
                <div className="w-8 h-8 rounded-xs bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#8A6A2F]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-[#1A1A1A]">Mobile Hygiene Discipline</h4>
                  <p className="text-[11px] text-[#8C6F66] font-sans">
                    Zero Compromise on Sterility
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#1A1A1A]/75 font-sans leading-relaxed">
                We recreate strict surgical-grade hygiene inside your home. Never settle for messy salon setups:
              </p>

              <ul className="space-y-2.5 pt-1">
                {hygieneProtocols.map((protocol, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#1A1A1A]/85">
                    <CheckCircle2 className="w-4 h-4 text-[#8A6A2F] shrink-0 mt-0.5" />
                    <span>{protocol}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#E8E2D8]">
              <button
                type="button"
                onClick={() => openBooking({ mode: 'home' })}
                className="btn-gold-primary w-full text-center"
              >
                Reserve Mobile Team to Your Residence
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
