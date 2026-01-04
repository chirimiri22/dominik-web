import React from 'react'
import { motion } from 'framer-motion'
import LocaleSwitcher from './LocaleSwitcher'
import { useI18n } from '../i18n'

type Props = {}

const Intro: React.FC<Props> = () => {
  const { t } = useI18n()
  return (
    <section className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/background.webp')" }}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute top-4 right-1/2 translate-x-1/2 z-20">
        <LocaleSwitcher className="flex gap-2" />
      </div>
      <motion.div
        className="relative z-10 text-center p-6 text-white px-6 sm:px-8 lg:px-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('intro.title')}</h1>
        <p className="mb-6 text-lg">{t('intro.subtitle')}</p>
        <button
          type="button"
          onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white font-semibold"
        >
          {t('intro.cta')}
        </button>
      </motion.div>
    </section>
  )
}

export default Intro
