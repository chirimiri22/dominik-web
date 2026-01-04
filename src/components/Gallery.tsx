import React from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n'

type Image = {
  id: string
  src: string
  alt: string
}

const sampleImages: Image[] = [
  { id: '1', src: 'https://placehold.co/600x400', alt: 'Ukázka 1' },
  { id: '2', src: 'https://placehold.co/600x400', alt: 'Ukázka 2' },
  { id: '3', src: 'https://placehold.co/600x400', alt: 'Ukázka 3' },
]

const Gallery: React.FC = () => {
  const { t } = useI18n()
  return (
    <section className="py-16">
      <div className="px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">{t('gallery.title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {sampleImages.map((img) => (
            <motion.div key={img.id} whileHover={{ scale: 1.03 }} className="overflow-hidden rounded-lg">
              <img src={img.src} alt={img.alt} className="w-full h-56 object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
