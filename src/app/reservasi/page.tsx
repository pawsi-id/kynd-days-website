'use client';

import { useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  MapPin,
  User,
  Phone,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { services, branches, happyHour } from '@/data/services';
import { cn } from '@/lib/utils';

const timeSlots = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30', '20:00', '20:30',
];

const steps = [
  { id: 1, title: 'Lokasi', icon: MapPin },
  { id: 2, title: 'Layanan', icon: Sparkles },
  { id: 3, title: 'Jadwal', icon: CalendarIcon },
  { id: 4, title: 'Data Diri', icon: User },
];

function BookingContent() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);

  // Refs for scroll targets
  const formSectionRef = useRef<HTMLElement>(null);
  const durationSectionRef = useRef<HTMLDivElement>(null);
  const timeSlotsRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);

  // Pre-fill from URL params
  const serviceIdParam = searchParams.get('service');
  const durationParam = searchParams.get('duration');

  const [formData, setFormData] = useState(() => ({
    serviceId: serviceIdParam || '',
    duration: durationParam ? parseInt(durationParam) : 0,
    date: undefined as Date | undefined,
    time: '',
    branchId: '',
    name: '',
    phone: '',
    notes: '',
  }));

  const selectedService = services.find((s) => s.id === formData.serviceId);
  const selectedDuration = selectedService?.durations.find(
    (d) => d.minutes === formData.duration
  );
  const selectedBranch = branches.find((b) => b.id === formData.branchId);

  // Check if selected time is Happy Hour
  const isHappyHour = () => {
    if (!formData.date || !formData.time) return false;
    const dayOfWeek = formData.date.getDay();
    const [hour] = formData.time.split(':').map(Number);
    // Monday = 1, Thursday = 4
    return dayOfWeek >= 1 && dayOfWeek <= 4 && hour >= 10 && hour < 14;
  };

  const calculatePrice = () => {
    if (!selectedDuration) return 0;
    return isHappyHour() ? selectedDuration.happyHourPrice : selectedDuration.price;
  };

  // Reusable scroll utility
  const scrollToElement = (ref: React.RefObject<HTMLElement | HTMLDivElement | null>, offset = 140) => {
    setTimeout(() => {
      if (ref.current) {
        const elementPosition = ref.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 50);
  };

  // Step 1: Branch selection → scroll to Lanjut button
  const handleBranchSelect = (branchId: string) => {
    setFormData({ ...formData, branchId });
    scrollToElement(navigationRef, 450);
  };

  // Step 2: Service selection → scroll to duration section
  const handleServiceSelect = (serviceId: string) => {
    setFormData({ ...formData, serviceId, duration: 0 });
    scrollToElement(durationSectionRef, 250);
  };

  // Step 2: Duration selection → scroll to Lanjut button
  const handleDurationSelect = (duration: number) => {
    setFormData({ ...formData, duration });
    scrollToElement(navigationRef, 450);
  };

  // Step 3: Date selection → scroll to time slots
  const handleDateSelect = (date: Date | undefined) => {
    setFormData({ ...formData, date, time: '' });
    if (date) {
      scrollToElement(timeSlotsRef, 250);
    }
  };

  // Step 3: Time selection → scroll to Lanjut button
  const handleTimeSelect = (time: string) => {
    setFormData({ ...formData, time });
    scrollToElement(navigationRef, 450);
  };

  // Navigation between steps → scroll to form top
  const handleStepChange = (newStep: number) => {
    setCurrentStep(newStep);
    scrollToElement(formSectionRef, 140);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.branchId;
      case 2:
        return formData.serviceId && formData.duration > 0;
      case 3:
        return formData.date && formData.time;
      case 4:
        return formData.name && formData.phone;
      default:
        return false;
    }
  };

  const generateWhatsAppMessage = () => {
    const dateStr = formData.date
      ? formData.date.toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '';

    return encodeURIComponent(
      `Halo ${selectedBranch?.name}!\n\n` +
        `Saya ingin melakukan reservasi:\n\n` +
        `*Layanan:* ${selectedService?.nameId}\n` +
        `*Durasi:* ${formData.duration} menit\n` +
        `*Tanggal:* ${dateStr}\n` +
        `*Jam:* ${formData.time}\n` +
        `*Harga:* IDR ${calculatePrice()}K${isHappyHour() ? ' (Happy Hour)' : ''}\n\n` +
        `*Nama:* ${formData.name}\n` +
        `*No. HP:* ${formData.phone}\n` +
        (formData.notes ? `*Catatan:* ${formData.notes}\n\n` : '\n') +
        `Mohon konfirmasi ketersediaan. Terima kasih!`
    );
  };

  return (
    <div className="pt-20 pb-16 md:pt-24">
      {/* Hero Section */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-background to-background-light">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-accent text-xs md:text-sm font-medium tracking-wider uppercase mb-3 md:mb-4 block">
              Reservasi
            </span>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary font-semibold mb-3 md:mb-4">
              Booking Online
            </h1>
            <p className="text-foreground/60 text-sm md:text-base">
              Pilih layanan, jadwal, dan cabang yang Anda inginkan
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-border py-3 md:py-4">
        <div className="container-custom">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    'flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-full transition-all min-h-[40px]',
                    currentStep === step.id
                      ? 'bg-primary text-white'
                      : currentStep > step.id
                      ? 'bg-green-100 text-green-700'
                      : 'bg-background-light text-foreground/50'
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline text-sm font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'w-4 sm:w-12 md:w-16 h-0.5 mx-1 sm:mx-2',
                      currentStep > step.id ? 'bg-green-300' : 'bg-border'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section ref={formSectionRef} className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          {/* Step 1: Branch Selection */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <h2 className="font-heading text-xl md:text-2xl text-primary font-semibold mb-4 md:mb-6">
                Pilih Cabang
              </h2>

              <div className="space-y-3 md:space-y-4">
                {branches.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => handleBranchSelect(branch.id)}
                    className={cn(
                      'w-full p-4 md:p-6 rounded-xl md:rounded-2xl border-2 text-left transition-all',
                      formData.branchId === branch.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30'
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex gap-3 md:gap-4 flex-1 min-w-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-primary mb-1 text-sm md:text-base">{branch.name}</h4>
                          <p className="text-xs md:text-sm text-foreground/60 mb-1 md:mb-2 line-clamp-2">{branch.address}</p>
                          <p className="text-xs md:text-sm text-accent">{branch.phone}</p>
                        </div>
                      </div>
                      <div
                        className={cn(
                          'w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5',
                          formData.branchId === branch.id
                            ? 'border-primary bg-primary'
                            : 'border-border'
                        )}
                      >
                        {formData.branchId === branch.id && (
                          <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Service Selection */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <h2 className="font-heading text-xl md:text-2xl text-primary font-semibold mb-4 md:mb-6">
                Pilih Layanan
              </h2>

              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className={cn(
                      'w-full p-4 md:p-6 rounded-xl md:rounded-2xl border-2 text-left transition-all',
                      formData.serviceId === service.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30'
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-primary text-sm md:text-base">{service.nameId}</h3>
                          {service.isPopular && (
                            <Badge className="bg-accent text-white text-xs">Populer</Badge>
                          )}
                        </div>
                        <p className="text-xs md:text-sm text-foreground/60 line-clamp-2">{service.descriptionId}</p>
                      </div>
                      <div
                        className={cn(
                          'w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5',
                          formData.serviceId === service.id
                            ? 'border-primary bg-primary'
                            : 'border-border'
                        )}
                      >
                        {formData.serviceId === service.id && (
                          <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Duration Selection */}
              {selectedService && (
                <div ref={durationSectionRef} className="animate-fade-in">
                  <h3 className="font-semibold text-primary mb-3 md:mb-4 text-sm md:text-base">Pilih Durasi</h3>
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 md:gap-3">
                    {selectedService.durations.map((duration) => (
                      <button
                        key={duration.minutes}
                        onClick={() => handleDurationSelect(duration.minutes)}
                        className={cn(
                          'px-4 md:px-6 py-3 rounded-xl border-2 transition-all min-h-[60px]',
                          formData.duration === duration.minutes
                            ? 'border-primary bg-primary text-white'
                            : 'border-border hover:border-primary/30'
                        )}
                      >
                        <p className="font-semibold text-sm md:text-base">{duration.minutes} menit</p>
                        <p className="text-xs md:text-sm opacity-80">IDR {duration.price}K</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Date & Time Selection */}
          {currentStep === 3 && (
            <div className="animate-fade-in">
              <h2 className="font-heading text-xl md:text-2xl text-primary font-semibold mb-4 md:mb-6">
                Pilih Jadwal
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Calendar */}
                <div>
                  <h3 className="font-semibold text-primary mb-3 md:mb-4 text-sm md:text-base">Tanggal</h3>
                  <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-background-light">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={handleDateSelect}
                      disabled={(date) => date < new Date()}
                      className="rounded-md"
                    />
                  </div>
                </div>

                {/* Time Slots */}
                <div ref={timeSlotsRef}>
                  <h3 className="font-semibold text-primary mb-3 md:mb-4 text-sm md:text-base">Jam</h3>

                  {!formData.date ? (
                    <div className="p-6 md:p-8 rounded-xl md:rounded-2xl bg-background-light text-center">
                      <CalendarIcon className="w-10 h-10 md:w-12 md:h-12 text-foreground/30 mx-auto mb-3" />
                      <p className="text-foreground/60 text-sm md:text-base">Pilih tanggal terlebih dahulu</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots.map((time) => {
                          const [hour] = time.split(':').map(Number);
                          const isHappyHourSlot =
                            formData.date &&
                            formData.date.getDay() >= 1 &&
                            formData.date.getDay() <= 4 &&
                            hour >= 10 &&
                            hour < 14;

                          return (
                            <button
                              key={time}
                              onClick={() => handleTimeSelect(time)}
                              className={cn(
                                'px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative min-h-[44px]',
                                formData.time === time
                                  ? 'bg-primary text-white'
                                  : 'bg-background-light hover:bg-primary/10'
                              )}
                            >
                              {time}
                              {isHappyHourSlot && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Happy Hour Notice */}
                      <div className="mt-3 md:mt-4 p-3 md:p-4 rounded-lg md:rounded-xl bg-accent/10 flex items-start gap-2 md:gap-3">
                        <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-accent shrink-0 mt-0.5" />
                        <div className="text-xs md:text-sm">
                          <p className="font-medium text-primary">Happy Hour {happyHour.discount}% OFF</p>
                          <p className="text-foreground/60">
                            {happyHour.days}, {happyHour.startTime}-{happyHour.endTime}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Personal Info */}
          {currentStep === 4 && (
            <div className="animate-fade-in">
              <h2 className="font-heading text-xl md:text-2xl text-primary font-semibold mb-4 md:mb-6">
                Data Diri
              </h2>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nama Lengkap *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                    <Input
                      type="text"
                      placeholder="Nama Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-12 bg-background-light border-border"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    No. WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                    <Input
                      type="tel"
                      placeholder="08xx xxxx xxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-12 bg-background-light border-border"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Catatan (opsional)
                  </label>
                  <Textarea
                    placeholder="Permintaan khusus atau catatan lainnya..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    className="bg-background-light border-border resize-none"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="mt-6 md:mt-8 p-4 md:p-6 rounded-xl md:rounded-2xl bg-background-light">
                <h3 className="font-semibold text-primary mb-3 md:mb-4 text-sm md:text-base">Ringkasan Reservasi</h3>
                <div className="space-y-2.5 md:space-y-3 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Layanan</span>
                    <span className="font-medium text-right">{selectedService?.nameId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Durasi</span>
                    <span className="font-medium">{formData.duration} menit</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Tanggal</span>
                    <span className="font-medium text-right">
                      {formData.date?.toLocaleDateString('id-ID', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Jam</span>
                    <span className="font-medium">{formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Cabang</span>
                    <span className="font-medium text-right">{selectedBranch?.name}</span>
                  </div>
                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/60">Total</span>
                      <div className="text-right flex items-center gap-2 flex-wrap justify-end">
                        <span className="text-xl md:text-2xl font-bold text-primary">
                          IDR {calculatePrice()}K
                        </span>
                        {isHappyHour() && (
                          <Badge className="bg-accent text-white text-xs">Happy Hour</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div ref={navigationRef} className="flex items-center justify-between mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border gap-3">
            <Button
              variant="outline"
              onClick={() => handleStepChange(currentStep - 1)}
              disabled={currentStep === 1}
              className="border-primary text-primary min-h-[44px] text-sm md:text-base"
            >
              <ChevronLeft className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Kembali</span>
              <span className="sm:hidden">Back</span>
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={() => handleStepChange(currentStep + 1)}
                disabled={!canProceed()}
                className="bg-primary hover:bg-primary-dark text-white min-h-[44px] text-sm md:text-base"
              >
                Lanjut
                <ChevronRight className="w-4 h-4 ml-1 md:ml-2" />
              </Button>
            ) : (
              <a
                href={`https://wa.me/${selectedBranch?.whatsapp}?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(!canProceed() && 'pointer-events-none opacity-50')}
              >
                <Button
                  disabled={!canProceed()}
                  className="bg-[#25D366] hover:bg-[#20BA5C] text-white min-h-[44px] text-sm md:text-base"
                >
                  <MessageCircle className="w-4 h-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Kirim via WhatsApp</span>
                  <span className="sm:hidden">WhatsApp</span>
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ReservasiPage() {
  return (
    <Suspense fallback={
      <div className="pt-24 pb-16 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Memuat halaman reservasi...</p>
        </div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
