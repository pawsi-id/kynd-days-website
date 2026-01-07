'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
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
  { id: 1, title: 'Layanan', icon: Sparkles },
  { id: 2, title: 'Jadwal', icon: CalendarIcon },
  { id: 3, title: 'Lokasi', icon: MapPin },
  { id: 4, title: 'Data Diri', icon: User },
];

function BookingContent() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceId: '',
    duration: 0,
    date: undefined as Date | undefined,
    time: '',
    branchId: '',
    name: '',
    phone: '',
    notes: '',
  });

  // Pre-fill from URL params
  useEffect(() => {
    const serviceId = searchParams.get('service');
    const duration = searchParams.get('duration');

    if (serviceId) {
      setFormData((prev) => ({
        ...prev,
        serviceId,
        duration: duration ? parseInt(duration) : 0,
      }));
    }
  }, [searchParams]);

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

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.serviceId && formData.duration > 0;
      case 2:
        return formData.date && formData.time;
      case 3:
        return formData.branchId;
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
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-background to-background-light">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
              Reservasi
            </span>
            <h1 className="font-heading text-4xl md:text-5xl text-primary font-semibold mb-4">
              Booking Online
            </h1>
            <p className="text-foreground/60">
              Pilih layanan, jadwal, dan cabang yang Anda inginkan
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="sticky top-20 z-30 bg-white border-b border-border py-6">
        <div className="container-custom">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full transition-all',
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
                      'w-8 sm:w-16 h-0.5 mx-2',
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
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <h2 className="font-heading text-2xl text-primary font-semibold mb-6">
                Pilih Layanan
              </h2>

              <div className="space-y-4 mb-8">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() =>
                      setFormData({ ...formData, serviceId: service.id, duration: 0 })
                    }
                    className={cn(
                      'w-full p-6 rounded-2xl border-2 text-left transition-all',
                      formData.serviceId === service.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30'
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-primary">{service.nameId}</h3>
                          {service.isPopular && (
                            <Badge className="bg-accent text-white text-xs">Populer</Badge>
                          )}
                        </div>
                        <p className="text-sm text-foreground/60">{service.descriptionId}</p>
                      </div>
                      <div
                        className={cn(
                          'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                          formData.serviceId === service.id
                            ? 'border-primary bg-primary'
                            : 'border-border'
                        )}
                      >
                        {formData.serviceId === service.id && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Duration Selection */}
              {selectedService && (
                <div className="animate-fade-in">
                  <h3 className="font-semibold text-primary mb-4">Pilih Durasi</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedService.durations.map((duration) => (
                      <button
                        key={duration.minutes}
                        onClick={() =>
                          setFormData({ ...formData, duration: duration.minutes })
                        }
                        className={cn(
                          'px-6 py-3 rounded-xl border-2 transition-all',
                          formData.duration === duration.minutes
                            ? 'border-primary bg-primary text-white'
                            : 'border-border hover:border-primary/30'
                        )}
                      >
                        <p className="font-semibold">{duration.minutes} menit</p>
                        <p className="text-sm opacity-80">IDR {duration.price}K</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Date & Time Selection */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <h2 className="font-heading text-2xl text-primary font-semibold mb-6">
                Pilih Jadwal
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div>
                  <h3 className="font-semibold text-primary mb-4">Tanggal</h3>
                  <div className="p-4 rounded-2xl bg-background-light">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => setFormData({ ...formData, date })}
                      disabled={(date) => date < new Date()}
                      className="rounded-md"
                    />
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <h3 className="font-semibold text-primary mb-4">Jam</h3>
                  <div className="grid grid-cols-4 gap-2">
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
                          onClick={() => setFormData({ ...formData, time })}
                          className={cn(
                            'px-3 py-2 rounded-lg text-sm font-medium transition-all relative',
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
                  <div className="mt-4 p-4 rounded-xl bg-accent/10 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-primary">Happy Hour {happyHour.discount}% OFF</p>
                      <p className="text-foreground/60">
                        {happyHour.days}, {happyHour.startTime}-{happyHour.endTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Branch Selection */}
          {currentStep === 3 && (
            <div className="animate-fade-in">
              <h2 className="font-heading text-2xl text-primary font-semibold mb-6">
                Pilih Cabang
              </h2>

              <div className="space-y-4">
                {branches.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => setFormData({ ...formData, branchId: branch.id })}
                    className={cn(
                      'w-full p-6 rounded-2xl border-2 text-left transition-all',
                      formData.branchId === branch.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30'
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary mb-1">{branch.name}</h3>
                          <p className="text-sm text-foreground/60 mb-2">{branch.address}</p>
                          <p className="text-sm text-accent">{branch.phone}</p>
                        </div>
                      </div>
                      <div
                        className={cn(
                          'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0',
                          formData.branchId === branch.id
                            ? 'border-primary bg-primary'
                            : 'border-border'
                        )}
                      >
                        {formData.branchId === branch.id && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Personal Info */}
          {currentStep === 4 && (
            <div className="animate-fade-in">
              <h2 className="font-heading text-2xl text-primary font-semibold mb-6">
                Data Diri
              </h2>

              <div className="space-y-6">
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
              <div className="mt-8 p-6 rounded-2xl bg-background-light">
                <h3 className="font-semibold text-primary mb-4">Ringkasan Reservasi</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Layanan</span>
                    <span className="font-medium">{selectedService?.nameId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Durasi</span>
                    <span className="font-medium">{formData.duration} menit</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Tanggal</span>
                    <span className="font-medium">
                      {formData.date?.toLocaleDateString('id-ID', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Jam</span>
                    <span className="font-medium">{formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Cabang</span>
                    <span className="font-medium">{selectedBranch?.name}</span>
                  </div>
                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/60">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-primary">
                          IDR {calculatePrice()}K
                        </span>
                        {isHappyHour() && (
                          <Badge className="ml-2 bg-accent text-white">Happy Hour</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              disabled={currentStep === 1}
              className="border-primary text-primary"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                disabled={!canProceed()}
                className="bg-primary hover:bg-primary-dark text-white"
              >
                Lanjut
                <ChevronRight className="w-4 h-4 ml-2" />
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
                  className="bg-[#25D366] hover:bg-[#20BA5C] text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Kirim via WhatsApp
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
