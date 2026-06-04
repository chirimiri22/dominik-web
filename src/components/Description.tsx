import {useI18n} from '../i18n'
const Description = (): JSX.Element => {
    const {t} = useI18n()
    const rawPoints = t('description.points')
    const points = Array.isArray(rawPoints) ? rawPoints : []
    const rawParagraphs = t('description.paragraphs')
    const paragraphs = Array.isArray(rawParagraphs)
        ? rawParagraphs.filter((p): p is string => typeof p === 'string')
        : [String(t('description.text'))]

    return (
        <section id="description" className="py-24 bg-sand-50 ">
            <div className="px-6 sm:px-8 lg:px-12 max-w-screen-xl mx-auto">
                <div className="mb-10 max-w-3xl">
                    <h2 className="text-4xl sm:text-5xl font-semibold text-ink">{t('description.title')}</h2>
                </div>

                <div className="flex gap-8 sm:flex-row flex-col">
                    <div  className="flex-1 space-y-8">
                        <div className="space-y-4 text-ink/70 leading-relaxed">
                            {paragraphs.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="rounded-[1.75rem] border border-sand-200 bg-white p-6 sm:p-8 shadow-soft">
                            <h3 className="text-xl font-semibold mb-4 text-ink">{t('description.valuesTitle')}</h3>
                            <ul className="space-y-3 text-ink/80">
                                {points.map((point, index) => (
                                    <li key={index}
                                        className="flex gap-3 rounded-2xl bg-white px-4 py-3 border border-sand-200">
                                        <span
                                            className="mt-2 inline-flex h-2.5 w-2.5 rounded-full bg-clay-500 flex-shrink-0"/>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div
                        // ref={rightRef}
                        className="rounded-[1.75rem] flex-1 overflow-hidden border border-sand-200 bg-sand-50 shadow-soft"
                        // style={rightMaxHeight ? {maxHeight: `${rightMaxHeight}px`} : undefined}
                    >
                        <img src={'/dominik.webp'} alt={t('description.imageAlt')}
                             className="w-full h-full object-cover block min-h-[26rem]"

                        />

                    </div>
                </div>
            </div>

        </section>
    )
}

export default Description
