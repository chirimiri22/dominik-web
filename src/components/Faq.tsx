import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useI18n } from '../i18n'

type FaqItem = {
  question: string
  answer: string | string[]
}

const Faq = (): JSX.Element => {
  const { t } = useI18n()
  const rawItems = t('faq.items')
  const items: FaqItem[] = Array.isArray(rawItems)
    ? rawItems.filter(
        (item): item is FaqItem =>
          Boolean(item) &&
          typeof item.question === 'string' &&
          (typeof item.answer === 'string' ||
            (Array.isArray(item.answer) && item.answer.every((p: unknown) => typeof p === 'string'))),
      )
    : []
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <section id="faq" className="py-24 bg-sand-50 ">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl mb-10">
          <h2 className="mb-3 text-4xl sm:text-5xl font-semibold text-ink">{t('faq.title')}</h2>
          <p className="leading-relaxed text-ink/70">{t('faq.subtitle')}</p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <motion.div
                key={item.question}
                layout
                className="overflow-hidden rounded-[1.5rem] border border-sand-200 bg-white shadow-soft"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-semibold text-ink">{item.question}</span>
                  <ChevronDownIcon
                    className={`h-5 w-5 shrink-0 text-clay-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 px-6 pb-6 text-ink/70 leading-relaxed">
                        {(Array.isArray(item.answer) ? item.answer : [item.answer]).map((paragraph, paragraphIndex) => (
                          <p key={paragraphIndex}>{paragraph}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Faq
