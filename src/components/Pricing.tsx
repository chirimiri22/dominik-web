import React, { useState, useEffect} from 'react'
import {useI18n, Trans, sanitizeHtml} from '../i18n'

type ServiceDetail = {
    title: string
    paragraphs: string[]
}


// Reusable card component for a tier
const TierCard: React.FC<{tier: string, special?: boolean, styles?: string, noTime?: boolean}> = ({tier, special, styles = "", noTime}) => {
    const {t} = useI18n()

    const contentRef = React.useRef<HTMLDivElement | null>(null)
    const [isExpanded, setIsExpanded] = React.useState(false)
    const [hasOverflow, setHasOverflow] = React.useState(false)

    React.useEffect(() => {
        const el = contentRef.current
        if (!el) return
        const check = () => setHasOverflow(el.scrollHeight > 250)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [t, tier])

    return (
        <article
            key={tier}
            className={`${styles} rounded-[1.5rem] border bg-white p-5 shadow-soft relative ${isExpanded ? 'pb-16' : ''}`}
        >
            {/* header */}
            <div className={"flex justify-between items-center  "}>
                 <h3 className="mt-2 text-lg font-semibold text-ink">{t(`pricing.tiers.${tier}.title`)}</h3>
                {special && (
                    <span className="mb-4 inline-flex rounded-full bg-clay-500 px-2 py-0.5  text-[10px] sm:px-4 sm:py-1 sm:text-xs font-semibold uppercase tracking-[0.24em] text-white">
                        {String(t('pricing.badgeRecommended'))}
                    </span>
                )}

            </div>

            {/* content area: constrained when not expanded */}
            <div ref={contentRef} className={`relative mt-3 ${!isExpanded ? 'max-h-[250px] overflow-hidden' : ''}`}>
                <div className="flex items-baseline gap-2">
                    {!noTime && (
                        <>
                        <p className="text-2xl  font-semibold text-ink/70">{t(`pricing.tiers.${tier}.duration`)}</p>
                        <span className="text-2xl text-ink/50">/</span>
                        </>
                    )}

                    <p className="text-2xl font-semibold text-clay-600">{t(`pricing.tiers.${tier}.price`)} Kč</p>
                </div>

                <div className="mt-3 text-sm text-ink/70">
                    <Trans html={ sanitizeHtml(String(t(`pricing.tiers.${tier}.advantage`))) } className="prose prose-sm max-w-none text-ink/70" />
                </div>

                {/* fade */}
                {!isExpanded && hasOverflow && (
                    <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-white/90 to-transparent" />
                )}
            </div>

            {/* chevron toggle */}
            {hasOverflow && (
                <button
                    onClick={() => setIsExpanded(v => !v)}
                    aria-expanded={isExpanded}
                    className="absolute left-1/2 transform -translate-x-1/2 bottom-4 z-10 inline-flex items-center justify-center rounded-full bg-clay-600 text-white w-8 h-8 p-1 shadow transition-transform"
                    aria-label={isExpanded ? t('pricing.readLess') : t('pricing.readMore')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 transform ${isExpanded ? 'rotate-180' : ''}`}>
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>
            )}
        </article>
    )
}


const Pricing: React.FC<{closePrompt: () => void }>= ({closePrompt}) => {
    const {t} = useI18n()
    const rawServices = t('pricing.services')
    const services: ServiceDetail[] = Array.isArray(rawServices)
        ? rawServices.filter(
            (item): item is ServiceDetail =>
                Boolean(item) &&
                typeof item.title === 'string' &&
                Array.isArray(item.paragraphs) &&
                item.paragraphs.every((p: unknown) => typeof p === 'string'),
        )
        : []


    // Three separate components as requested
    const ShortTier: React.FC= () => <TierCard tier={"short"} styles={"flex-1 border-sand-200"}  />

    const BasicTier: React.FC = () => <TierCard tier={"basic"} styles={"flex-1 border-sand-200"}  />
    const ProTier: React.FC = () => <TierCard tier={"pro"} special styles={"flex-1 border-2 border-accent-yellow"}   />
    const DeluxeTier: React.FC = () => <TierCard tier={"deluxe"} styles={"md:max-w-[50%] border-sand-200"}/>


    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [showEligibility, setShowEligibility] = useState(false)

    // Responsive check for mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 640px)').matches)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const rawEligibility = String(t('pricing.eligibilityInfo'))
    const sanitizedEligibility = sanitizeHtml(rawEligibility)

    return (
        <section id="pricing" className="py-24 bg-sand-50 ">
            <div className="px-6 sm:px-8 lg:px-12 max-w-screen-xl mx-auto">
                <div className="max-w-2xl mb-10">
                    <h2 className="text-4xl sm:text-5xl font-semibold mb-3 text-ink">{t('pricing.title')}</h2>
                </div>

                {services.length > 0 && (
                    <div className="mb-8">
                        <p className="mb-4 text-2xl font-semibold text-clay-600">{t('pricing.servicesSubtitle')}</p>
                        <div className="flex md:flex-row flex-col gap-6 ">
                            {services.map((service, index) => (
                                <article key={index} className="flex-1 rounded-[1.5rem] border border-sand-200 bg-white p-6 shadow-soft">
                                    <h3 className="mb-3 text-xl font-semibold text-ink">{service.title}</h3>
                                    <div className="space-y-3 text-ink/75 leading-relaxed text-sm">
                                        {service.paragraphs.map((paragraph, paragraphIndex) => (
                                            <p key={paragraphIndex}>{paragraph}</p>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                )}

                <p className="mb-4 text-2xl font-semibold text-clay-600 leading-tight">{t('pricing.variantsSubtitle')}</p>

                <div className="flex flex-col gap-6">

                        <>
                            <div className="flex flex-col md:flex-row gap-6">
                                <ShortTier />
                                <BasicTier />
                                <ProTier />
                            </div>

                            {/* Deluxe on its own line */}
                            <div className="flex justify-center">
                                <DeluxeTier />
                            </div>
                        </>

                </div>


                <div className="mt-8 flex flex-col items-center gap-3">
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
                        <button
                            id={isMobile ? "calendar" : undefined}
                            type="button"
                            className="sm:hidden block rounded-full bg-clay-500 px-9 py-4 text-lg font-semibold text-white shadow-soft transition-colors hover:bg-clay-600"
                            onClick={() => {
                                if (isMobile) {
                                    closePrompt()
                                    setIsModalOpen(true)
                                } else {
                                    setIsExpanded((prev) => !prev)
                                }
                            }}
                            aria-expanded={isExpanded}
                            aria-controls="booking-details"
                        >
                            {t('pricing.myAppointments')}
                        </button>
                        <button
                            type="button"
                            className="rounded-full border-2 border-clay-500 px-9 py-4 text-lg font-semibold text-clay-600 bg-white shadow-soft transition-colors hover:bg-clay-50 flex items-center justify-center gap-2"
                            onClick={() => setShowEligibility((prev) => !prev)}
                            aria-expanded={showEligibility}
                            aria-controls="massage-eligibility-info"
                        >
                            {t('pricing.eligibilityButton')}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`w-5 h-5 transition-transform duration-300 ${showEligibility ? 'rotate-180' : ''}`}
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                    </div>
                    {showEligibility && (
                        <div id="massage-eligibility-info" className="mt-4 w-full max-w-3xl rounded-xl border border-sand-200 bg-white p-6 text-ink/80 text-base shadow-soft animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="prose prose-sm max-w-none text-ink/80">
                                <Trans html={sanitizedEligibility} />
                            </div>
                        </div>
                    )}
                </div>


            </div>
            {/* Inline iframe for large screens only */}
            {!isMobile && (
                <div id={"calendar"} className="mx-auto mt-4 max-w-screen-xl px-6 lg:px-12 h-[88vh]">
                    <iframe

                        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2JNtcZkXOdcRq_3KKjzjCvf1wgs3uAJ8WPi2wdzpMhiozy4AsSIsQk7pZPf1AMWF4MhnFaDPGZ?gv=true"
                        width="100%"
                        title={t('booking.title')}
                        className="w-full h-full rounded-[1.25rem] border border-sand-200 bg-white"
                    />
                </div>
            )}

            {/* Modal for mobile only */}
            {isMobile && isModalOpen && (
                <div id={"calendar"} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="relative w-full h-full max-w-3xl max-h-[90vh] rounded-[1.25rem] border border-sand-200 bg-white shadow-2xl flex items-start">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 z-10 rounded-full bg-white/90 hover:bg-white text-clay-600 p-3 shadow-lg focus:outline-none"
                                aria-label={t('booking.close')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <iframe
                                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2JNtcZkXOdcRq_3KKjzjCvf1wgs3uAJ8WPi2wdzpMhiozy4AsSIsQk7pZPf1AMWF4MhnFaDPGZ?gv=true"
                                title={t('booking.title')}
                                width="100%"
                                height="100%"
                                className="w-full h-full rounded-[1.25rem]"
                            />
                        </div>
                    </div>
                </div>
            )}

        </section>
    )
}

export default Pricing
