import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, MessageSquare, ArrowUpRight, CheckCircle2, MapPin } from "lucide-react";
import { COMPANY } from "@/data/company";

// 10-digit Indian phone number regex
const phoneSchema = z
  .string()
  .min(10, "Please enter a valid 10-digit phone number")
  .max(10, "Phone number must be 10 digits")
  .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number starting with 6, 7, 8, or 9");

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: phoneSchema,
  location: z.string().min(2, "Location in or around Hosadurga is required"),
  projectType: z.string().min(1, "Please select a project type"),
  requirements: z.string().min(10, "Please provide a brief outline of your requirements (min 10 characters)"),
});

type FormValues = z.infer<typeof formSchema>;

export const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      location: "Hosadurga",
      projectType: "Residential House Construction",
      requirements: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // Construct WhatsApp message prefill
    const message = `*NEW PROJECT INQUIRY — A1 CONSTRUCTION*
---------------------------------------
*Client Name:* ${data.fullName}
*Phone:* +91 ${data.phone}
*Project Location:* ${data.location}
*Project Type:* ${data.projectType}
*Requirements:*
${data.requirements}
---------------------------------------
_Sent via A1 Construction Web Portal_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${COMPANY.phoneRaw}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setIsSubmitted(true);
    reset();
  };

  return (
    <section
      id="contact"
      className="relative bg-navy-900 text-ivory-100 py-24 md:py-36 overflow-hidden border-t border-gold-500/15"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Action & Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-ultra font-mono text-gold-500 block mb-2">
                06 / CONTACT & CONSULTATION
              </span>
              <h2 className="headline-section font-serif font-bold text-ivory-100 mb-6">
                Let's Build Something <br />
                <span className="italic font-normal text-gold-400">Extraordinary.</span>
              </h2>
              <p className="text-sm md:text-base text-ivory-200/75 leading-relaxed font-light mb-8">
                Ready to turn your architectural vision into reality? Speak directly with our master builders in Hosadurga or submit your project details below.
              </p>

              {/* Direct Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-orange-construction hover:bg-orange-hover text-ivory-100 text-xs uppercase tracking-wider font-medium shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
                <a
                  href={COMPANY.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm border border-gold-500/40 hover:border-gold-500 text-gold-400 hover:text-gold-300 text-xs uppercase tracking-wider font-medium backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            {/* Location & Details Card */}
            <div className="p-6 rounded-sm bg-navy-950 border border-gold-500/20">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-sm bg-gold-500/10 text-gold-400 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400">
                    Primary Service Area
                  </h4>
                  <p className="text-base font-serif text-ivory-100 mt-1">
                    Hosadurga and surrounding areas
                  </p>
                  <p className="text-xs text-ivory-200/60 mt-1">
                    Karnataka, India
                  </p>
                  <p className="text-xs font-mono text-gold-500/90 mt-3">
                    Direct Phone: +91 8904830461
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form with validation */}
          <div className="lg:col-span-7 bg-navy-950 p-8 md:p-12 rounded-sm border border-gold-500/25 shadow-luxury">
            <h3 className="text-2xl font-serif font-bold text-ivory-100 mb-2">
              Project Discussion Form
            </h3>
            <p className="text-xs text-ivory-200/70 font-light mb-8">
              Fill in your preliminary details. Upon submission, this connects straight to our WhatsApp line with your pre-formatted brief.
            </p>

            {isSubmitted && (
              <div className="mb-6 p-4 rounded-sm bg-gold-500/10 border border-gold-500/30 text-ivory-100 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <div className="text-xs">
                  <strong>Inquiry Ready!</strong> WhatsApp has been launched with your project brief. If it didn't open automatically,{" "}
                  <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer" className="underline text-gold-400">
                    click here to message us
                  </a>.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-gold-400 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  {...register("fullName")}
                  className="w-full bg-navy-900 border border-navy-800 focus:border-gold-500 text-ivory-100 text-sm px-4 py-3 rounded-sm transition-colors outline-none"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1.5 font-mono">{errors.fullName.message}</p>
                )}
              </div>

              {/* Phone & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-gold-400 mb-2">
                    Phone (10 Digits) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-ivory-200/50">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      maxLength={10}
                      {...register("phone")}
                      className="w-full bg-navy-900 border border-navy-800 focus:border-gold-500 text-ivory-100 text-sm pl-12 pr-4 py-3 rounded-sm transition-colors outline-none font-mono"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1.5 font-mono">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-gold-400 mb-2">
                    Location in / around Hosadurga *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hosadurga Town"
                    {...register("location")}
                    className="w-full bg-navy-900 border border-navy-800 focus:border-gold-500 text-ivory-100 text-sm px-4 py-3 rounded-sm transition-colors outline-none"
                  />
                  {errors.location && (
                    <p className="text-red-400 text-xs mt-1.5 font-mono">{errors.location.message}</p>
                  )}
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-gold-400 mb-2">
                  Project Discipline *
                </label>
                <select
                  {...register("projectType")}
                  className="w-full bg-navy-900 border border-navy-800 focus:border-gold-500 text-ivory-100 text-sm px-4 py-3 rounded-sm transition-colors outline-none"
                >
                  <option value="Residential House Construction">Residential House Construction</option>
                  <option value="Luxury Home Construction">Luxury Home Construction</option>
                  <option value="Structural Construction">Structural Construction</option>
                  <option value="Custom Home Projects">Custom Home Projects</option>
                  <option value="Complete Construction Solutions">Complete Construction Solutions</option>
                </select>
                {errors.projectType && (
                  <p className="text-red-400 text-xs mt-1.5 font-mono">{errors.projectType.message}</p>
                )}
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-gold-400 mb-2">
                  Project Outline / Requirements *
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your plot size, floors planned, intended timeline, or architectural ideas..."
                  {...register("requirements")}
                  className="w-full bg-navy-900 border border-navy-800 focus:border-gold-500 text-ivory-100 text-sm px-4 py-3 rounded-sm transition-colors outline-none resize-none"
                />
                {errors.requirements && (
                  <p className="text-red-400 text-xs mt-1.5 font-mono">{errors.requirements.message}</p>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-sm bg-orange-construction hover:bg-orange-hover text-ivory-100 font-medium text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-orange-construction/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Submit & Discuss on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
