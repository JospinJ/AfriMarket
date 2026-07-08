export type MobileMoneyOperator = "mtn" | "orange" | "moov" | "airtel" | "wave";

export interface MobileMoneyPayment {
  operator: MobileMoneyOperator;
  phone: string;
  otpRequired: true;
  status: "idle" | "otp_sent" | "verifying" | "success" | "failed" | "timeout";
}
