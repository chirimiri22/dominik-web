import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { useI18n } from '../i18n'

type Image = {
  id: string
  src: string
  altKey: string
}

const sampleImages: Image[] = [
  { id: '3', src: '/masaz_promo-1.webp', altKey: 'gallery.items.2' },
  { id: '4', src: '/masaz_promo-5.webp', altKey: 'gallery.items.3' },
  { id: '5', src: '/masaz_promo-7.webp', altKey: 'gallery.items.4' },
  { id: '6', src: '/masaz_promo-18.webp', altKey: 'gallery.items.5' },
  { id: '7', src: '/masaz_promo-21.webp', altKey: 'gallery.items.6' },
  { id: '8', src: '/masaz_promo-32.webp', altKey: 'gallery.items.7' },
  { id: '9', src: '/masaz_promo-33.webp', altKey: 'gallery.items.8' },
  { id: '10', src: '/masaz_promo-39.webp', altKey: 'gallery.items.9' },
]

const Gallery: React.FC = () => {
  const { t } = useI18n()
  const captions = (t('gallery.items') as string[]) || []
  const [visibleCount, setVisibleCount] = useState<number>(3)
  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)')
    const updateCount = (): void => setVisibleCount(media.matches ? 1 : 3)
    updateCount()
    media.addEventListener('change', updateCount)
    return () => media.removeEventListener('change', updateCount)
  }, [])

  const loopImages = useMemo(
    () => [...sampleImages.slice(-visibleCount), ...sampleImages, ...sampleImages.slice(0, visibleCount)],
    [visibleCount],
  )
  const [currentIndex, setCurrentIndex] = useState<number>(visibleCount)
  const [isAnimating, setIsAnimating] = useState<boolean>(true)

  useEffect(() => {
    setIsAnimating(false)
    setCurrentIndex(visibleCount)
    requestAnimationFrame(() => requestAnimationFrame(() => setIsAnimating(true)))
  }, [visibleCount])

  const handlePrev = (): void => {
    setIsAnimating(true)
    setCurrentIndex((prev) => prev - 1)
  }

  const handleNext = (): void => {
    setIsAnimating(true)
    setCurrentIndex((prev) => prev + 1)
  }

  const handleTrackTransitionEnd = (): void => {
    if (currentIndex < visibleCount) {
      setIsAnimating(false)
      setCurrentIndex(currentIndex + sampleImages.length)
      requestAnimationFrame(() => requestAnimationFrame(() => setIsAnimating(true)))
      return
    }

    if (currentIndex >= sampleImages.length + visibleCount) {
      setIsAnimating(false)
      setCurrentIndex(currentIndex - sampleImages.length)
      requestAnimationFrame(() => requestAnimationFrame(() => setIsAnimating(true)))
    }
  }

  return (
    <section id="gallery" className="py-24 bg-sand-100/70 ">
      <div className="px-6 sm:px-8 lg:px-12 max-w-screen-xl mx-auto">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="mb-3 text-4xl font-semibold text-ink sm:text-5xl">{t('gallery.title')}</h2>
            <p className="text-ink/70 leading-relaxed">{t('gallery.subtitle')}</p>
          </div>
        </div>

        <div className="mx-auto ">


          <div className="relative sm:px-12">
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-clay-500 text-white shadow-soft transition-colors hover:bg-clay-600 sm:inline-flex"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-clay-500 text-white shadow-soft transition-colors hover:bg-clay-600 sm:inline-flex"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden />
          </button>

          <div className="overflow-x-hidden overflow-y-visible">
          <div
            className="flex"
            onTransitionEnd={handleTrackTransitionEnd}
            style={{
              width: `${(loopImages.length * 100) / visibleCount}%`,
              transform: `translateX(-${(currentIndex * 100) / loopImages.length}%)`,
              transition: isAnimating ? 'transform 350ms ease' : 'none',
            }}
          >
            {loopImages.map((img, index) => (
              <motion.div
                key={`${img.id}-${index}`}
                className="group box-border"
                style={{ width: `${100 / loopImages.length}%` }}
              >
                <div className="relative h-full min-h-[24rem] sm:min-h-[18rem] overflow-hidden rounded-[1.5rem] border border-sand-200 bg-sand-50 shadow-soft">
                  <img
                    src={img.src}
                    alt={captions[Number(img.id) - 1] || t(img.altKey)}
                    className="h-full w-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        </div>
        </div>
          <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
              <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-clay-500 text-white shadow-soft transition-colors hover:bg-clay-600"
                  aria-label="Previous slide"
              >
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden />
              </button>
              <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-clay-500 text-white shadow-soft transition-colors hover:bg-clay-600"
                  aria-label="Next slide"
              >
                  <ChevronRightIcon className="h-5 w-5" aria-hidden />
              </button>
          </div>
        <motion.div
          whileHover={{ scale: 1.01, y: -3 }}
          className="mt-6 overflow-hidden rounded-[1.5rem] border border-sand-200 bg-white shadow-soft"
        >
          <div className="p-4 sm:p-5">
            <span className="mb-4 inline-flex rounded-full bg-clay-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {t('gallery.videoTag')}
            </span>
            <div className="mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-2xl border border-sand-200 bg-black">
              <iframe
                src="https://www.youtube-nocookie.com/embed/dF3qQkem9BY?rel=0&modestbranding=1&playsinline=1&iv_load_policy=3"
                title={t('gallery.videoTitle')}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Gallery
