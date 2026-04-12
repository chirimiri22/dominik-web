import React from 'react'
import {motion} from 'framer-motion'
import {useI18n} from '../i18n'

type Props = {}

const Intro: React.FC<Props> = () => {
    const {t} = useI18n()
    const subtitle = t('intro.subtitle') as string | string[]
    const subtitleLines = Array.isArray(subtitle) ? subtitle : [subtitle]

    return (
        <section
            id="intro"
            className="relative isolate min-h-screen flex items-center justify-center overflow-hidden scroll-mt-24 bg-[#d8ba96]"
        >
            <div
                className="absolute inset-0 md:inset-y-0 md:left-[25%] md:right-0 bg-cover bg-center"
                style={{backgroundImage: "url('/masaz_promo-13.webp')", backgroundPosition: '50% 35%'}}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-transparent"/>
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent"/>
            <motion.div
                className="relative z-10 mx-auto flex w-full max-w-screen-xl justify-start  sm:px-8 lg:px-12 py-24 sm:py-28"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >

                <div
                    className="mr-auto max-w-xl rounded-[2rem] border border-white/15 bg-black/35 p-8 sm:p-12 text-white shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-md text-left">
                    <p className="mb-8 inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sand-100">
                        {t('intro.badge')}
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-5">{t('intro.title')}</h1>

                    <p className="mb-8 text-lg sm:text-xl text-sand-100/90 leading-relaxed max-w-2xl">
                        {subtitleLines.map((line, index) => (
                            <React.Fragment key={`${line}-${index}`}>
                                {line}
                                {index < subtitleLines.length - 1 ? <br/> : null}
                            </React.Fragment>
                        ))}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-start">
                        <button
                            type="button"
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            })}
                            className="inline-flex items-center justify-center shrink-0 rounded-full bg-clay-500 px-7 py-3 font-semibold text-white shadow-soft transition-all hover:bg-clay-600 hover:-translate-y-0.5"
                        >
                            {t('intro.cta')}
                        </button>
                        <span className="text-sm text-sand-100/80">{t('intro.note')}</span>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Intro
