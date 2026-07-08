"use client";

import { BrandLogo } from "@/components/shared/BrandLogo";
import { BRAND } from "@/lib/constants/design";

interface NavbarLogoProps {
  /** Mobile : icône seule · Desktop : icône + nom */
  compact?: boolean;
  dark?: boolean;
  className?: string;
}

export function NavbarLogo({ compact = false, dark = false, className }: NavbarLogoProps) {
  if (compact) {
    return (
      <BrandLogo
        heightPx={BRAND.logoSizes.navbarMobile}
        showName={false}
        dark={dark}
        className={className}
      />
    );
  }

  return (
    <BrandLogo
      heightPx={BRAND.logoSizes.navbar}
      showName
      dark={dark}
      size="sm"
      hideNameOnMobile
      className={className}
    />
  );
}
