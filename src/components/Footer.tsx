import { useI18n } from '../i18n'

const Footer = (): JSX.Element => {
  const { t } = useI18n()
  const year = new Date().getFullYear()
  return (
    <footer className=" py-6">
      <div className="px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-sm text-gray-600">{t('footer.copyright', { year })}</div>
            <div className="text-sm text-gray-600">{t('footer.credit')}</div>
         </div>
       </div>
     </footer>
   )
 }

 export default Footer
