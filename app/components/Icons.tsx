/**
 * Icons.tsx — Inline SVG icon components
 * Drop-in replacement for react-icons/io5 (Ionicons 5 outline style).
 * Each component accepts the same { size?, className?, color? } props.
 */

import React from 'react'

interface IconProps {
  size?: number
  className?: string
  color?: string
}

function Icon({
  size = 24,
  className,
  color,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color || 'currentColor'}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  )
}

// ── Navigation ────────────────────────────────────────────────────────────────

export function IoMenuOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </Icon>
  )
}

export function IoCloseOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
  )
}

export function IoArrowForwardOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </Icon>
  )
}

export function IoSearchOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </Icon>
  )
}

// ── People & Identity ─────────────────────────────────────────────────────────

export function IoPersonOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </Icon>
  )
}

export function IoPeopleOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Icon>
  )
}

// ── Commerce & Business ───────────────────────────────────────────────────────

export function IoStorefrontOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 9l1.5-5h15L21 9" />
      <path d="M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9" />
      <path d="M3 9h18" />
      <path d="M9 9v4a3 3 0 0 0 6 0V9" />
    </Icon>
  )
}

export function IoBriefcaseOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </Icon>
  )
}

export function IoCashOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M6 12h.01M18 12h.01" />
    </Icon>
  )
}

export function IoWalletOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
      <path d="M16 7V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2" />
      <circle cx="17" cy="13" r="1" fill="currentColor" stroke="none" />
    </Icon>
  )
}

export function IoBarChartOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2" y="13" width="4" height="8" />
      <rect x="9" y="9" width="4" height="12" />
      <rect x="16" y="4" width="4" height="17" />
      <line x1="2" y1="21" x2="20" y2="21" />
    </Icon>
  )
}

export function IoTrendingUpOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </Icon>
  )
}

export function IoTrophyOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 2h12v6a6 6 0 0 1-12 0V2z" />
      <path d="M6 5H2v2a4 4 0 0 0 4 4" />
      <path d="M18 5h4v2a4 4 0 0 1-4 4" />
      <path d="M12 14v4" />
      <line x1="8" y1="22" x2="16" y2="22" />
      <line x1="9" y1="18" x2="15" y2="18" />
    </Icon>
  )
}

// ── Community & Cause ─────────────────────────────────────────────────────────

export function IoHeartOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Icon>
  )
}

export function IoCalendarOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </Icon>
  )
}

export function IoStarOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </Icon>
  )
}

export function IoLocationOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </Icon>
  )
}

export function IoSwapHorizontalOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </Icon>
  )
}

// ── Security & Auth ───────────────────────────────────────────────────────────

export function IoShieldCheckmarkOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </Icon>
  )
}

export function IoLockClosedOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </Icon>
  )
}

export function IoKeypadOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="5" cy="5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="19" cy="5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="5" cy="19" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="19" cy="19" r="1.2" fill="currentColor" stroke="none" />
    </Icon>
  )
}

export function IoEyeOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </Icon>
  )
}

export function IoEyeOffOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </Icon>
  )
}

// ── Communication ─────────────────────────────────────────────────────────────

export function IoMailOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22 6 12 13 2 6" />
    </Icon>
  )
}

export function IoChatbubbleOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </Icon>
  )
}

export function IoNotificationsOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </Icon>
  )
}

// ── UI & Utility ──────────────────────────────────────────────────────────────

export function IoCheckmarkCircleOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 11 14 15 10" />
    </Icon>
  )
}

export function IoClipboardOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </Icon>
  )
}

export function IoTimeOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </Icon>
  )
}

export function IoBulbOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <line x1="9" y1="21" x2="15" y2="21" />
      <line x1="9" y1="18" x2="15" y2="18" />
      <path d="M12 2a7 7 0 0 1 7 7 7 7 0 0 1-4 6.33V18H9v-2.67A7 7 0 0 1 5 9a7 7 0 0 1 7-7z" />
    </Icon>
  )
}

export function IoHelpCircleOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth={2.5} />
    </Icon>
  )
}

export function IoWarningOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth={2.5} />
    </Icon>
  )
}

export function IoThumbsUpOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </Icon>
  )
}

export function IoBugOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      <path d="M9 7h6a5 5 0 0 1 5 5v4a5 5 0 0 1-10 0v-4a5 5 0 0 1 5-5" />
      <path d="M5 11H2M22 11h-3M5 17H2M22 17h-3" />
      <path d="M8 2l1.5 2M16 2l-1.5 2" />
    </Icon>
  )
}

export function IoPhonePortraitOutline(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2.5} />
    </Icon>
  )
}

export function IoQrCodeOutline(props: IconProps) {
  return (
    <Icon {...props} strokeWidth={1.5}>
      {/* Top-left finder */}
      <rect x="2" y="2" width="8" height="8" rx="1" />
      <rect x="4" y="4" width="4" height="4" fill="currentColor" stroke="none" />
      {/* Top-right finder */}
      <rect x="14" y="2" width="8" height="8" rx="1" />
      <rect x="16" y="4" width="4" height="4" fill="currentColor" stroke="none" />
      {/* Bottom-left finder */}
      <rect x="2" y="14" width="8" height="8" rx="1" />
      <rect x="4" y="16" width="4" height="4" fill="currentColor" stroke="none" />
      {/* Data modules */}
      <rect x="14" y="14" width="2" height="2" fill="currentColor" stroke="none" />
      <rect x="18" y="14" width="2" height="2" fill="currentColor" stroke="none" />
      <rect x="16" y="16" width="2" height="2" fill="currentColor" stroke="none" />
      <rect x="14" y="18" width="2" height="2" fill="currentColor" stroke="none" />
      <rect x="18" y="18" width="2" height="2" fill="currentColor" stroke="none" />
      <rect x="20" y="16" width="2" height="2" fill="currentColor" stroke="none" />
    </Icon>
  )
}
