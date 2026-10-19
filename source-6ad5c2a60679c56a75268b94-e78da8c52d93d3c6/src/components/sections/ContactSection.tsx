import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Send,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { useToast } from '../ui/Toast';
import { SectionHeading } from '../ui/SectionHeading';

interface FormState {
  name: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  message?: string;
}

export const ContactSection: React.FC = () => {
  const { showToast } = useToast();
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (field: keyof FormState, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      case 'phone': {
        const clean = value.replace(/[\s\-()]/g, '');
        if (!clean) return 'Phone number is required';
        const pakRegex = /^((\+92)|(0092)|(0))?3[0-9]{9}$/;
        if (!pakRegex.test(clean)) {
          return 'Enter valid Pakistani mobile (e.g. 0300 1234567)';
        }
        return undefined;
      }
      case 'message':
        if (!value.trim()) return 'Inquiry message is required';
        if (value.trim().length < 10) return 'Please provide at least 10 characters';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, form[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {
      name: validateField('name', form.name),
      phone: validateField('phone', form.phone),
      message: validateField('message', form.message),
    };

    setErrors(newErrors);
    setTouched({ name: true, phone: true, message: true });

    if (newErrors.name || newErrors.phone || newErrors.message) {
      showToast('Please correct the highlighted fields', 'error');
      return;
    }

    const encodedMessage = encodeURIComponent(
      `Hello Luxeora Studio Concierge,\n\nName: ${form.name.trim()}\nPhone: ${form.phone.trim()}\nInquiry:\n${form.message.trim()}\n\nSent from website inquiry form.`
    );

    const waUrl = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodedMessage}`;
    window.location.href = waUrl;

    showToast('Redirecting to WhatsApp with your inquiry...', 'success');
    setForm({ name: '', phone: '', message: '' });
    setTouched({});
  };

  return (
    <section id="contact" className="py-24 bg-[#FFFDF9] border-t border-[#E8DCCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Visit Or Connect"
          title="Connect With Our"
          accent="Concierge"
          subtitle="Our all-female team is at your disposal for bridal consultations, bespoke packages, or at-home booking inquiries."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Atelier Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Location Card */}
            <div className="card-luxe p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-sm bg-[#FAF8F5] border border-[#E8DCCF] flex items-center justify-center text-[#8A6A2F] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-medium text-[#1E1B18]">
                    Super Market Atelier
                  </h3>
                  <p className="mt-1 text-sm text-[#5C5248] leading-relaxed">
                    {siteConfig.address.line1}
                    <br />
                    {siteConfig.address.line2}
                    <br />
                    {siteConfig.address.city}, {siteConfig.address.country}
                  </p>
                  <p className="mt-2 text-xs text-[#8C6F66]">
                    Full: {siteConfig.address.full}
                  </p>
                  <a
                    href={siteConfig.geo.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs uppercase tracking-widest font-semibold text-[#8A6A2F] hover:text-[#1E1B18] transition-colors"
                  >
                    Open in Google Maps
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="card-luxe p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-sm bg-[#FAF8F5] border border-[#E8DCCF] flex items-center justify-center text-[#8A6A2F] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-medium text-[#1E1B18]">
                    Operating Hours
                  </h3>
                  <p className="mt-1 text-sm text-[#5C5248]">
                    {siteConfig.hours.days}: {siteConfig.hours.label}
                  </p>
                  <p className="mt-1 text-xs text-[#8C6F66]">
                    Bridal rituals available earlier by pre-arranged appointment.
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-wider text-[#8A6A2F] font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8A6A2F]" />
                    Private Sanctuary • 100% All-Female Team
                  </p>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Card */}
            <div className="p-6 sm:p-7 rounded-sm bg-[#1B3B2B] text-white border border-[#254F3A] relative overflow-hidden shadow-soft-2">
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9ED8B4] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  Instant WhatsApp Desk
                </div>
                <h3 className="font-serif text-xl font-medium mt-1">
                  Direct Concierge Support
                </h3>
                <p className="mt-2 text-xs text-white/80 leading-relaxed">
                  Need an urgent slot confirmation, bridal quote, or at-home booking in Islamabad/Rawalpindi? Chat directly with our manager.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxe btn-whatsapp inline-flex items-center gap-2 px-5 text-xs uppercase tracking-widest font-semibold"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    Chat on WhatsApp
                  </a>
                  <a
                    href={`tel:${siteConfig.phone.raw}`}
                    className="btn-luxe inline-flex items-center gap-2 px-4 bg-white/10 text-white border border-white/20 hover:bg-white/20 text-xs uppercase tracking-widest font-semibold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-white" />
                    Call Studio
                  </a>
                </div>
              </div>
            </div>

            {/* Email Contact */}
            <div className="card-luxe p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#8A6A2F]" />
                <span className="text-xs uppercase tracking-wider text-[#5C5248]">
                  Phone &amp; Desk
                </span>
              </div>
              <a
                href={`tel:${siteConfig.phone.raw}`}
                className="text-xs font-medium text-[#1E1B18] hover:text-[#8A6A2F] transition-colors"
              >
                {siteConfig.phone.display}
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="card-luxe p-7 sm:p-9 relative">
              <h3 className="font-serif text-2xl font-medium text-[#1E1B18]">
                Send a Bespoke Inquiry
              </h3>
              <p className="mt-1 text-sm text-[#5C5248]">
                Fill out the form below. Submitting will immediately open WhatsApp with your pre-composed message for fast concierge reply.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs uppercase tracking-widest font-medium text-[#5C5248] mb-2"
                  >
                    Your Full Name <span className="text-[#8A6A2F]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    placeholder="e.g. Ayesha Khan"
                    className={`input-luxe w-full px-4 text-sm text-[#1E1B18] placeholder:text-[#5C5248]/40 ${
                      errors.name ? 'border-red-400 bg-red-50/20' : ''
                    }`}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="mt-1 text-xs text-red-600 font-medium">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs uppercase tracking-widest font-medium text-[#5C5248] mb-2"
                  >
                    Pakistani Mobile / WhatsApp <span className="text-[#8A6A2F]">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                    placeholder="0300 1234567"
                    className={`input-luxe w-full px-4 text-sm text-[#1E1B18] placeholder:text-[#5C5248]/40 ${
                      errors.phone ? 'border-red-400 bg-red-50/20' : ''
                    }`}
                  />
                  {errors.phone && (
                    <p id="contact-phone-error" className="mt-1 text-xs text-red-600 font-medium">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs uppercase tracking-widest font-medium text-[#5C5248] mb-2"
                  >
                    How Can We Serve You? <span className="text-[#8A6A2F]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    placeholder="Tell us about your desired service, date, bridal occasion, or at-home request..."
                    className={`input-luxe w-full p-4 text-sm text-[#1E1B18] placeholder:text-[#5C5248]/40 resize-none ${
                      errors.message ? 'border-red-400 bg-red-50/20' : ''
                    }`}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="mt-1 text-xs text-red-600 font-medium">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-luxe btn-gold-primary w-full inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold"
                  >
                    <Send className="w-4 h-4" />
                    Dispatch Inquiry via WhatsApp
                  </button>
                  <p className="mt-3 text-center text-[11px] text-[#8C6F66]">
                    No waiting: Your inquiry reaches our F-6 front desk in real-time.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
