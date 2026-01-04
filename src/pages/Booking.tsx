import React, {useEffect, useState} from 'react'
import {useI18n} from '../i18n'
import {useSearchParams, useNavigate} from 'react-router-dom'
import TierSelector from '../components/TierSelector'


const Booking: React.FC = () => {
    const {t} = useI18n()
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const initialTier = searchParams.get('tier') || null
    const [selectedTier, setSelectedTier] = useState<string | null>(initialTier)

    useEffect(() => {
        setSelectedTier(initialTier)
    }, [initialTier])


    useEffect(() => {

    }, [selectedTier])

    const confirmations = (t('pricing.tiers.form.confirmations') as string[]) || []

    const [confirmChecked, setConfirmChecked] = useState<Record<number, boolean>>({})
    const [confirmError, setConfirmError] = useState<string | null>(null)
    const [submitted, setSubmitted] = useState<boolean | null>(null)

    return (
        <main className="min-h-screen  bg-gray-50">
            <section className="bg-white py-16">
                <div className=" max-w-6xl mx-auto">
                    <button className="mb-4 text-sm text-blue-600"
                            onClick={() => navigate('/')}>← {t('booking.back')}</button>

                    <h1 className="text-2xl font-semibold mb-4">{t('booking.title')}</h1>
                    <TierSelector onTierSelect={(id) => {
                        setSelectedTier(id);
                        setSearchParams({tier: id}, {replace: true})
                    }} selectedId={selectedTier}/>
                </div>
            </section>

            <section className="py-16">


                <div className=" max-w-6xl mx-auto ">
                    <h1 className="text-2xl font-semibold mb-4">Můžu podstoupit masáž?</h1>


                    <div className="p-4 mb-4 rounded bg-blue-50 text-blue-800">Masáž je možné provádět pouze za určitých
                        podmínek, pokud máte nějaké zdravotní komplikace. Tak je třeba se poradit s lekářem, zda je
                        možné masáž provést.
                    </div>

                    <div className="bg-gray-100 rounded p-4 mb-4">
                        <p className="mb-2 text-sm text-gray-700">{t('booking.infoParagraph')}</p>
                        <div className="space-y-2">
                            {confirmations.map((c, i) => (
                                <label key={i} className="flex items-center gap-3">
                                    <input type="checkbox" checked={!!confirmChecked[i]}
                                           onChange={() => setConfirmChecked(prev => ({...prev, [i]: !prev[i]}))}/>
                                    <span>{c}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {confirmError && <div className="text-sm text-red-600 mb-2">{confirmError}</div>}

                    <div className="flex gap-3">
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={() => {
                                const allConfirmed = confirmations.every((_, i) => !!confirmChecked[i])
                                if (!allConfirmed) {
                                    setConfirmError(t('pricing.tiers.form.confirmError'))
                                    setSubmitted(false)
                                    return
                                }
                                setSubmitted(true)
                                setConfirmError(null)
                            }}
                        >
                            {t('pricing.tiers.form.continue')}
                        </button>





                    </div>









                </div>
            </section>

            {!confirmError && submitted && <section className="bg-white py-16">
                <div className=" max-w-6xl mx-auto"><iframe
                    src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3jVXa5mF3DcHAY8xSSwr0iZjr9Rdvc5-MuxGIuWvyEzyqOiA4K4e9-0y_S4UoxNaMnteascoE9?gv=true"
                    width="100%" height="600"></iframe></div></section>}


        </main>
    )
}

export default Booking
