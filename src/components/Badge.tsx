import React, {ReactNode} from 'react'

type Props = {
  title: string
    icon?: ReactNode
}

const Badge: React.FC<Props> = ({ title, icon}) => {
  return (
    <p className="inline-flex items-center rounded-full gap-1 bg-white/10 px-2 py-0.5 text-[10px] sm:px-4 sm:py-1 sm:text-xs font-semibold uppercase tracking-[0.24em] text-sand-100">
        {icon}
        {title}
    </p>
  )
}

export default Badge

