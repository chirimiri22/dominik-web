import { useI18n } from '../i18n'

const Footer = (): JSX.Element => {
  const { t } = useI18n()
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-sand-200 bg-sand-50 py-8">
      <div className="px-6 sm:px-8 lg:px-12 max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-ink/60">{t('footer.copyright', { year })}</div>
          <div className="text-sm font-medium text-ink/70">{t('footer.credit')}</div>
        </div>
      </div>
    </footer>
  )
}

 export default Footer
