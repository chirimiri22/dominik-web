import {useI18n} from '../i18n'

const Description = (): JSX.Element => {
    const {t} = useI18n()
    return (
        <section className="py-16 bg-white">
            <div className="px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-4">{t('description.title')}</h2>
                    <div className={"md:flex-row flex-col flex items-center gap-8"}>
                        <img src={"/dominik.jpeg"} alt="Fotka" className=" w-80 h-auto rounded-lg shadow-md"/>
                        <div >
                            <p className="text-lg text-gray-700 mb-8">{t('description.text')}</p>
                            {/* TODO: translation*/}
                            <h3 className="text-xl font-semibold mb-4">Zakládám si na</h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>Individální přístup</li>
                                <li>Respekt</li>
                                <li>Vnímavost</li>
                            </ul>
                        </div>
                    </div>

            </div>
        </section>
    )
}

export default Description
