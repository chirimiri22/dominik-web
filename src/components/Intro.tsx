import React from 'react'
import {motion, useReducedMotion} from 'framer-motion'
import {useI18n} from '../i18n'
import {MapPinIcon} from '@heroicons/react/24/solid'
import Badge from './Badge'

type Props = {}

const Intro: React.FC<Props> = () => {
    const {t} = useI18n()
    const subtitle = t('intro.subtitle') as string | string[]
    const subtitleLines = Array.isArray(subtitle) ? subtitle : [subtitle]

    // Typing effect for subtitle. Respect reduced-motion.
    const reduced = useReducedMotion()
    const [visibleIndex, setVisibleIndex] = React.useState(0)
    const [displayText, setDisplayText] = React.useState('')
    const [isDeleting, setIsDeleting] = React.useState(false)
    const displayRef = React.useRef('')

    React.useEffect(() => {
        if (reduced || subtitleLines.length === 0) {
            setDisplayText(subtitleLines[0] || '')
            displayRef.current = subtitleLines[0] || ''
            return
        }

        let timeoutId: number | undefined
        const fullText = subtitleLines[visibleIndex]
        const typingSpeed = 60
        const deletingSpeed = 40
        const pauseAfterFull = 3000
        const pauseBeforeType = 300

        const tick = () => {
            const current = displayRef.current
            if (!isDeleting) {
                const next = fullText.slice(0, current.length + 1)
                displayRef.current = next
                setDisplayText(next)
                if (next === fullText) {
                    timeoutId = window.setTimeout(() => setIsDeleting(true), pauseAfterFull) as unknown as number
                } else {
                    timeoutId = window.setTimeout(tick, typingSpeed) as unknown as number
                }
            } else {
                const next = fullText.slice(0, Math.max(0, current.length - 1))
                displayRef.current = next
                setDisplayText(next)
                if (next === '') {
                    timeoutId = window.setTimeout(() => {
                        setIsDeleting(false)
                        setVisibleIndex(i => (i + 1) % subtitleLines.length)
                    }, pauseBeforeType) as unknown as number
                } else {
                    timeoutId = window.setTimeout(tick, deletingSpeed) as unknown as number
                }
            }
        }

        // initialize ref
        displayRef.current = displayText
        timeoutId = window.setTimeout(tick, 500) as unknown as number

        return () => {
            if (timeoutId) clearTimeout(timeoutId)
        }
    }, [visibleIndex, isDeleting, reduced, subtitleLines])

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


                    <div className={"mb-4 sm:mb-8 "}>
                        <span className=" text-sand-100/90 text-sm sm:text-lg">{t('intro.note1')}</span>
                        <div className="mb-4 sm:mb-8 text-sm sm:text-lg text-sand-100/90 leading-relaxed max-w-2xl">
                            {reduced ? (
                                <p className="m-0">{subtitleLines[0]}</p>
                            ) : (
                                <>
                                    <style>{`@keyframes blink{50%{opacity:0}}`}</style>
                                    <p className="m-0" aria-live="polite">
                                        {displayText}
                                        <span
                                            className="ml-1 inline-block w-0.5 h-5 bg-sand-100"
                                            style={{animation: 'blink 1300ms steps(1, start) infinite'}}
                                            aria-hidden
                                        />
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-start">
                        <button
                            type="button"
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            })}
                            className="inline-flex items-center sm:text-lg justify-center shrink-0 rounded-full bg-clay-500 px-7 py-3 font-semibold text-white shadow-soft transition-all hover:bg-clay-600 hover:-translate-y-0.5"
                        >
                            {t('intro.cta')}
                        </button>

                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Intro
