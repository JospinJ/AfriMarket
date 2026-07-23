"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Address, CountryCode } from "@/types/common";
import type { PaymentMethod } from "@/types/order";
import type { MobileMoneyOperator } from "@/types/payment";
import { useCartStore } from "@/store/useCartStore";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { TrustCheckoutShell } from "@/components/checkout/TrustCheckoutShell";
import { AddressForm } from "@/components/checkout/AddressForm";
import {
  DeliveryMethodPicker,
  type DeliveryMethod,
} from "@/components/checkout/DeliveryMethodPicker";
import { PaymentMethodTabs } from "@/components/checkout/PaymentMethodTabs";
import { CardForm } from "@/components/checkout/CardForm";
import { CheckoutSuccess } from "@/components/checkout/CheckoutSuccess";
import { MobileMoneySelector } from "@/components/shared/MobileMoneySelector";
import { OtpInput } from "@/components/shared/OtpInput";
import { OrderSummary } from "@/components/shared/OrderSummary";
import { Button } from "@/components/ui/button";
import {
  validateCheckout,
  initiateMobileMoneyPayment,
  verifyOtp,
  createOrder,
} from "@/services/checkout";
import { getZoneByCity } from "@/lib/mocks/delivery-zones";
import { ROUTES } from "@/lib/constants/routes";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const clearCart = useCartStore((s) => s.clearCart);

  const [step, setStep] = useState(1);
  const [address, setAddress] = useState<Partial<Address>>({
    country: "CM" as CountryCode,
    fullName: "",
    phone: "",
    city: "Douala",
    district: "",
  });
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("moto");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mobile_money");
  const [mmOperator, setMmOperator] = useState<MobileMoneyOperator | null>(null);
  const [mmPhone, setMmPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const subtotal = getSubtotal();
  const zone = getZoneByCity(address.country ?? "CM", address.city ?? "");
  const deliveryFee = zone?.baseFee ?? 2500;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (items.length === 0 && !orderId) {
      router.push(ROUTES.cart);
    }
  }, [items.length, orderId, router]);

  if (items.length === 0 && !orderId) {
    return null;
  }

  if (orderId) {
    return <CheckoutSuccess orderId={orderId} total={total} />;
  }

  const canProceedStep1 =
    address.fullName?.trim() &&
    address.phone?.trim() &&
    address.city?.trim() &&
    address.district?.trim();

  const handleNext = async () => {
    setErrors([]);
    if (step === 1 && canProceedStep1) {
      setStep(2);
      return;
    }
    if (step === 2) {
      setStep(3);
      return;
    }
    if (step === 3) {
      if (paymentMethod === "mobile_money") {
        if (!otpSent && mmOperator && mmPhone) {
          setLoading(true);
          try {
            const result = await initiateMobileMoneyPayment(mmOperator, mmPhone, total);
            setSessionId(result.sessionId);
            setOtpSent(true);
          } finally {
            setLoading(false);
          }
          return;
        }
      }
      setStep(4);
      return;
    }
    if (step === 4) {
      setLoading(true);
      try {
        const payload = {
          address: {
            id: "addr-new",
            fullName: address.fullName!,
            phone: address.phone!,
            country: address.country!,
            city: address.city!,
            district: address.district!,
            landmark: address.landmark,
            instructions: address.instructions,
          },
          deliveryMethod,
          paymentMethod,
          items,
          mobileMoney:
            paymentMethod === "mobile_money" && mmOperator
              ? { operator: mmOperator, phone: mmPhone }
              : undefined,
        };
        const validation = await validateCheckout(payload);
        if (!validation.valid) {
          setErrors(validation.errors);
          return;
        }
        const order = await createOrder(payload);
        clearCart();
        setOrderId(order.orderId);
        setStep(5);
      } catch (e) {
        setErrors([e instanceof Error ? e.message : "Erreur lors de la commande"]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOtpComplete = async (otp: string) => {
    setLoading(true);
    try {
      const result = await verifyOtp(sessionId, otp);
      if (result.status === "success") {
        setStep(4);
      } else {
        setErrors(["Code OTP invalide. Réessayez."]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      <div className="mx-auto max-w-6xl px-4 py-6 pb-32">
        <h1 className="font-display text-2xl font-bold text-night md:text-3xl">
          Finaliser votre commande
        </h1>
        <p className="mt-1 text-sm text-sand">
          Étape {step} sur 4 — paiement Mobile Money recommandé
        </p>

        <CheckoutStepper currentStep={step} />
        <TrustCheckoutShell currentStep={step} />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.35 }}
              >
                {step === 1 && (
                  <section className="rounded-2xl bg-white p-4 shadow-premium-sm sm:p-6">
                    <h2 className="mb-4 font-display font-semibold text-night">
                      Adresse de livraison
                    </h2>
                    <AddressForm address={address} onChange={setAddress} errors={errors} />
                  </section>
                )}

                {step === 2 && (
                  <section className="rounded-2xl bg-white p-4 shadow-premium-sm sm:p-6">
                    <h2 className="mb-4 font-display font-semibold text-night">
                      Mode de livraison
                    </h2>
                    <DeliveryMethodPicker
                      country={address.country ?? "CM"}
                      city={address.city ?? ""}
                      selected={deliveryMethod}
                      onSelect={setDeliveryMethod}
                    />
                  </section>
                )}

                {step === 3 && (
                  <section className="space-y-6 rounded-2xl bg-white p-4 shadow-premium-sm sm:p-6">
                    <div>
                      <h2 className="font-display font-semibold text-night">Paiement</h2>
                      <p className="mt-1 text-sm text-sand">
                        Mobile Money en premier — MTN, Orange, Moov selon votre pays
                      </p>
                    </div>
                    <PaymentMethodTabs selected={paymentMethod} onSelect={setPaymentMethod} />

                    {paymentMethod === "mobile_money" && (
                      <div className="rounded-xl border-2 border-primary/25 bg-brand-orange-muted/30 p-4">
                        <MobileMoneySelector
                          country={address.country ?? "CM"}
                          selected={mmOperator}
                          phone={mmPhone}
                          onOperatorChange={setMmOperator}
                          onPhoneChange={setMmPhone}
                        />
                        {otpSent && (
                          <div className="mt-6 border-t border-sand/20 pt-6">
                            <p className="mb-3 text-sm font-medium text-night">
                              Saisissez le code OTP reçu par SMS
                            </p>
                            <OtpInput
                              onComplete={handleOtpComplete}
                              onResend={() => setOtpSent(false)}
                            />
                            <p className="mt-2 text-xs text-sand">
                              Pas de réseau ? Un SMS de secours sera envoyé automatiquement.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {paymentMethod === "card" && <CardForm />}
                    {paymentMethod === "cod" && (
                      <p className="rounded-xl bg-surface-light p-4 text-sm text-sand">
                        Paiement à la livraison en FCFA. Confirmation par SMS obligatoire.
                      </p>
                    )}
                    {paymentMethod === "wallet" && (
                      <p className="rounded-xl bg-surface-light p-4 text-sm text-sand">
                        Solde wallet : 0 FCFA (mock). Rechargez via Mobile Money.
                      </p>
                    )}
                  </section>
                )}

                {step === 4 && (
                  <section className="rounded-2xl bg-white p-4 shadow-premium-sm sm:p-6">
                    <h2 className="mb-4 font-display font-semibold text-night">
                      Vérification finale
                    </h2>
                    <div className="space-y-3 rounded-xl bg-surface-light p-4 text-sm">
                      <p>
                        <span className="font-medium text-night">Adresse :</span>{" "}
                        {address.fullName}, {address.district}, {address.city}
                      </p>
                      <p>
                        <span className="font-medium text-night">Livraison :</span>{" "}
                        {deliveryMethod}
                      </p>
                      <p>
                        <span className="font-medium text-night">Paiement :</span>{" "}
                        {paymentMethod === "mobile_money"
                          ? `Mobile Money (${mmOperator ?? "—"})`
                          : paymentMethod}
                      </p>
                    </div>
                    {errors.length > 0 && (
                      <ul className="mt-4 space-y-1 text-sm text-terracotta">
                        {errors.map((err) => (
                          <li key={err}>{err}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                )}
              </motion.div>
            </AnimatePresence>

            {step < 5 && (
              <div className="mt-6 flex gap-3">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                    Retour
                  </Button>
                )}
                <Button
                  type="button"
                  disabled={
                    loading ||
                    (step === 1 && !canProceedStep1) ||
                    (step === 3 &&
                      paymentMethod === "mobile_money" &&
                      (!mmOperator || !mmPhone))
                  }
                  onClick={handleNext}
                  className="flex-1 shadow-glow-orange md:flex-none md:min-w-[200px]"
                >
                  {loading
                    ? "Traitement..."
                    : step === 3 && paymentMethod === "mobile_money" && !otpSent
                      ? "Envoyer OTP"
                      : step === 4
                        ? "Payer maintenant"
                        : "Continuer"}
                </Button>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <OrderSummary items={items} subtotal={subtotal} deliveryFee={deliveryFee} />
              <p className="text-center text-xs text-sand">
                En validant, vous acceptez nos conditions de vente et notre politique de
                remboursement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
