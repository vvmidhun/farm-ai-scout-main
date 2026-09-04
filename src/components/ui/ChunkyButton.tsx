import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'default' | 'success' | 'danger'
type Size = 'sm' | 'lg'

interface ChunkyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
}

const VARIANT: Record<Variant, string> = {
  primary:
    'bg-gold text-bot-ink border-bot-ink/40 hover:bg-gold-soft active:translate-y-[2px] disabled:bg-gold/60',
  ghost:
    'bg-white/85 text-bot-ink border-bot-ink/25 hover:bg-white active:translate-y-[2px] disabled:bg-white/40',
  default:
    'bg-white text-bot-ink border-bot-ink/30 hover:bg-cream active:translate-y-[2px] disabled:bg-white/40',
  success:
    'bg-good text-emerald-950 border-emerald-900/30 active:translate-y-[2px]',
  danger:
    'bg-bad text-white border-bad/40 active:translate-y-[2px]',
}

const SIZE: Record<Size, string> = {
  sm: 'h-10 px-3 text-sm rounded-2xl',
  lg: 'h-14 px-4 text-base font-extrabold rounded-[1.25rem]',
}

export function ChunkyButton({
  variant = 'default',
  size = 'sm',
  className = '',
  children,
  ...rest
}: ChunkyButtonProps) {
  return (
    <button
      type="button"
      className={[
        'inline-flex select-none items-center justify-center gap-2 rounded-xl border-b-[3px] border-r-[2px] shadow-toy transition-transform font-display font-extrabold tracking-wide',
        VARIANT[variant],
        SIZE[size],
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </button>
  )
}
