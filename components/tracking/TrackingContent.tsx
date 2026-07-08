"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Order } from "@/types/order";
import type { DeliveryTracking } from "@/types/delivery";
import { TrackingHeader } from "@/components/tracking/TrackingHeader";
import { SmsFallbackNotice } from "@/components/tracking/SmsFallbackNotice";
import { DriverCard } from "@/components/tracking/DriverCard";
import { TrackingActions } from "@/components/tracking/TrackingActions";
import { StatusTimeline } from "@/components/shared/StatusTimeline";
import { OrderSummary } from "@/components/shared/OrderSummary";
import { formatFCFA } from "@/lib/utils/format-fcfa";
import { PurchaseModeChip } from "@/components/shared/PurchaseModeChip";
import Image from "next/image";

const LiveMap = dynamic(
  () => import("@/components/tracking/LiveMap").then((m) => m.LiveMap),
  { ssr: false, loading: () => <div className="aspect-video animate-pulse rounded-2xl bg-sand/20" /> }
);

interface TrackingContentProps {
  order: Order;
  tracking: DeliveryTracking;
}

export function TrackingContent({ order, tracking }: TrackingContentProps) {
  const [status, setStatus] = useState(order.status);
  const showMap = status === "shipped" || status === "in_delivery";
  const gpsAvailable = !!tracking.driverPosition;

  const timelineSteps = tracking.steps.map((step) => ({
    key: step.key,
    label: step.label,
    done: step.done,
    current:
      !step.done &&
      tracking.steps.findIndex((s) => !s.done) === tracking.steps.indexOf(step),
    at: step.at,
  }));

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 pb-24">
      <TrackingHeader order={{ ...order, status }} />

      <section className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
        <h2 className="mb-4 font-semibold text-night">Suivi de commande</h2>
        <StatusTimeline steps={timelineSteps} orientation="vertical" className="md:hidden" />
        <StatusTimeline steps={timelineSteps} orientation="horizontal" className="hidden md:block" />
      </section>

      {showMap && (
        <section className="space-y-4">
          <LiveMap
            driverPosition={tracking.driverPosition}
            etaMinutes={tracking.etaMinutes}
          />
          {!gpsAvailable && (
            <SmsFallbackNotice phone={order.address.phone} lastUpdate="Il y a 5 min" />
          )}
        </section>
      )}

      {tracking.driver && showMap && <DriverCard driver={tracking.driver} />}

      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <h3 className="mb-3 font-semibold text-night">Articles</h3>
        <ul className="space-y-3">
          {order.items.map((item) => (
            <li key={`${item.productId}-${item.mode}`} className="flex gap-3">
              {item.image && (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                  <Image src={item.image} alt={item.title ?? ""} fill sizes="64px" className="object-cover" />
                </div>
              )}
              <div className="flex-1">
                <p className="font-medium text-night">{item.title}</p>
                <div className="mt-1 flex items-center gap-2">
                  <PurchaseModeChip mode={item.mode} size="sm" />
                  <span className="text-sm text-sand">×{item.quantity}</span>
                </div>
              </div>
              <span className="font-medium">{formatFCFA(item.unitPrice * item.quantity)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <h3 className="mb-2 font-semibold text-night">Adresse de livraison</h3>
        <p className="text-sm text-night">{order.address.fullName}</p>
        <p className="text-sm text-sand">{order.address.phone}</p>
        <p className="text-sm text-sand">
          {order.address.district}, {order.address.city}
        </p>
        {order.address.landmark && (
          <p className="text-sm text-sand">Repère : {order.address.landmark}</p>
        )}
      </section>

      <OrderSummary
        items={order.items}
        subtotal={order.subtotal}
        deliveryFee={order.deliveryFee}
        discount={order.discount}
      />

      <TrackingActions
        orderId={order.id}
        status={status}
        onCancel={() => setStatus("cancelled")}
      />
    </div>
  );
}
