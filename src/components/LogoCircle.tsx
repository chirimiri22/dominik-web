type Props = {
  isScrolled: boolean
}

const LogoCircle = ({ isScrolled }: Props): JSX.Element => {
  return (
    <span
      className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-bold tracking-[0.08em] transition-colors ${
        isScrolled
          ? 'border-clay-500 bg-clay-500 text-white'
          : 'border-white/40 bg-black/25 text-white backdrop-blur-sm'
      }`}
      aria-hidden
    >
      MP
    </span>
  )
}

export default LogoCircle

