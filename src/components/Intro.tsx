import React from 'react'
import {motion, useReducedMotion, AnimatePresence} from 'framer-motion'
import {useI18n} from '../i18n'
import {MapPinIcon} from '@heroicons/react/24/solid'
import Badge from './Badge'

type Props = {}

const Intro: React.FC<Props> = () => {
    const {t} = useI18n()
    const subtitle = t('intro.subtitle') as string | string[]
    const subtitleLines = Array.isArray(subtitle) ? subtitle : [subtitle]

    // Show one subtitle line at a time for 3 seconds. Respect reduced-motion.
    const reduced = useReducedMotion()
    const [visibleIndex, setVisibleIndex] = React.useState(0)

    React.useEffect(() => {
        if (reduced || subtitleLines.length <= 1) return
        const id = setInterval(() => {
            setVisibleIndex(i => (i + 1) % subtitleLines.length)
        }, 6000)
        return () => clearInterval(id)
    }, [subtitleLines.length, reduced])

    return (
        <section
            id="intro"
            className="relative isolate min-h-screen flex items-center justify-center overflow-hidden  bg-[#d8ba96]"
        >
            <div
                className="absolute inset-0 md:inset-y-0 md:left-[25%] md:right-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/masaz_promo-13.webp')",
                    backgroundPosition: '65% 39%',
                    backgroundSize: '320% auto' // increased zoom for small screens
                }}
            >
                {/* Reset background-size for larger screens */}
                <style>{`
                    @media (min-width: 640px) {
                        #intro .bg-cover {
                            background-size: 100% auto !important;
                        }
                    }
                `}</style>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-transparent"/>
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent"/>
            <motion.div
                className="relative z-10 mx-auto flex w-full max-w-screen-xl justify-center sm:justify-start sm:px-8 lg:px-12 py-24 sm:py-28"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >

                <div
                    className="mx-auto sm:mx-0 sm:mr-auto w-full max-w-xs sm:max-w-xl rounded-[2rem] border border-white/15 bg-black/35 p-6 sm:p-12 mt-16 sm:mt-0 text-white shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-md text-left">
                    {/* Badge: smaller on mobile, original size from sm+ */}
                    <div className="mb-4 sm:mb-8 flex items-center gap-4">
                        <Badge title={t('intro.badge') as string}/>


                        <Badge title={(t('intro.locationShort') as string) ?? (t('intro.location') as string)}
                               icon={<MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4 text-sand-100" aria-hidden/>}/>

                    </div>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-3 sm:mb-5">{t('intro.title')}</h1>

                    <div className="mb-4 sm:mb-8 text-sm sm:text-xl text-sand-100/90 leading-relaxed max-w-2xl">
                        {reduced ? (
                            <p className="m-0">{subtitleLines[0]}</p>
                        ) : (
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={visibleIndex}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.6}}
                                    className="m-0"
                                    aria-live="polite"
                                >
                                    {subtitleLines[visibleIndex]}
                                </motion.p>
                            </AnimatePresence>
                        )}
                    </div>
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
                        <span className=" text-sm text-sand-100/80">{t('intro.note')}</span>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Intro
