import { motion } from 'framer-motion'
import { useI18n } from '../i18n'

type TestimonialItem = {
  quote: string
  name: string
  role: string
}

const Testimonials = (): JSX.Element => {
  const { t } = useI18n()
  const rawItems = t('testimonials.items')
  const items: TestimonialItem[] = Array.isArray(rawItems)
    ? rawItems.filter(
        (item): item is TestimonialItem =>
          Boolean(item) &&
          typeof item.quote === 'string' &&
          typeof item.name === 'string' &&
          typeof item.role === 'string',
      )
    : []

  return (
    <section id="testimonials" className="py-24 bg-white ">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl mb-10">
          <h2 className="mb-3 text-4xl sm:text-5xl font-semibold text-ink">{t('testimonials.title')}</h2>
          {/*<p className="leading-relaxed text-ink/70">{t('testimonials.subtitle')}</p>*/}
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.figure
              key={`${item.name}-${index}`}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex h-full flex-col rounded-[1.5rem] border border-sand-200 bg-sand-50 p-6 shadow-soft"
            >
              <blockquote className="mb-6 flex-1 text-base leading-relaxed text-ink/80">
                “{item.quote}”
              </blockquote>

              <figcaption className="border-t border-sand-200 pt-4">
                <div className="font-semibold text-ink">{item.name}</div>
                <div className="text-sm text-ink/60">{item.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
