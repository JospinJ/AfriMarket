import { MessageSquare } from "lucide-react";

interface SmsFallbackNoticeProps {
  phone?: string;
  lastUpdate?: string;
}

export function SmsFallbackNotice({ phone, lastUpdate }: SmsFallbackNoticeProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gold/30 bg-gold/5 p-4">
      <MessageSquare size={20} className="shrink-0 text-gold" />
      <div>
        <p className="font-medium text-night">Suivi par SMS activé</p>
        <p className="mt-1 text-sm text-sand">
          GPS indisponible ou connexion faible. Vous recevrez des mises à jour par SMS
          {phone ? ` au ${phone}` : ""}.
        </p>
        {lastUpdate && (
          <p className="mt-1 text-xs text-sand">Dernière mise à jour : {lastUpdate}</p>
        )}
        {/* TODO API: POST /notifications/sms */}
      </div>
    </div>
  );
}
