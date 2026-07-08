import { notFound } from "next/navigation";
import { getOrderById, getTrackingByOrderId } from "@/lib/mocks/orders";
import { TrackingContent } from "@/components/tracking/TrackingContent";

interface TrackingPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: TrackingPageProps) {
  return {
    title: `Suivi commande #${params.id} | AfriMarket Hub`,
  };
}

export default function TrackingPage({ params }: TrackingPageProps) {
  // TODO API: GET /orders/:id/tracking
  const order = getOrderById(params.id);
  if (!order) notFound();

  const tracking = getTrackingByOrderId(params.id);
  if (!tracking) notFound();

  return <TrackingContent order={order} tracking={tracking} />;
}
