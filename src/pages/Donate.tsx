
import React, { useEffect, useState } from "react";
import { Layout, getLanguage } from "@/components/Layout";

const Donate = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  // Text content based on language
  const content = {
    page: {
      title: language === 'da' ? 'Doner til Team SEA' : 'Donate to Team SEA',
      subtitle: language === 'da' 
        ? 'Din støtte kan hjælpe os med at bygge brønde og forbedre livet for tusindvis af mennesker.'
        : 'Your support can help us build wells and improve the lives of thousands of people.',
      instructions: language === 'da' 
        ? 'Donér via MobilePay. Husk at skrive dit ønskede navn i beskedfeltet – eller skriv \'Anonym\'.'
        : 'Donate via MobilePay. Please write your preferred name in the message field – or write \'Anonymous\'.',
      mobilepay: language === 'da' ? 'MobilePay nummer' : 'MobilePay number',
      topDonors: language === 'da' ? 'Top donationer' : 'Top donations',
      amount: language === 'da' ? 'Beløb' : 'Amount',
      currency: language === 'da' ? 'kr' : 'DKK',
      steps: {
        title: language === 'da' ? 'Sådan donerer du' : 'How to donate',
        step1: language === 'da' ? 'Åbn MobilePay på din telefon' : 'Open MobilePay on your phone',
        step2: language === 'da' ? 'Scan QR-koden eller indtast nummeret' : 'Scan the QR code or enter the number',
        step3: language === 'da' ? 'Indtast beløbet du vil donere' : 'Enter the amount you want to donate',
        step4: language === 'da' ? 'Skriv dit navn (eller "Anonym") i beskedfeltet' : 'Write your name (or "Anonymous") in the message field',
        step5: language === 'da' ? 'Send din donation' : 'Send your donation',
      },
      qrCode: {
        title: language === 'da' ? 'Scan QR-koden' : 'Scan the QR code',
        placeholder: language === 'da' ? 'MobilePay QR-kode' : 'MobilePay QR code',
      },
      thanks: language === 'da' 
        ? 'Tak til alle vores generøse donorer som gør en forskel hver dag.'
        : 'Thank you to all our generous donors who make a difference every day.'
    }
  };

  return (
    <Layout>
      {/* Page Header */}
      <section className="pt-16 pb-12 bg-blue-500 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.page.title}</h1>
            <p className="text-xl">{content.page.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="section-title">{content.page.steps.title}</h2>
              <p className="mb-8">{content.page.instructions}</p>
              
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-primary font-bold">1</div>
                  <p>{content.page.steps.step1}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-primary font-bold">2</div>
                  <p>{content.page.steps.step2}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-primary font-bold">3</div>
                  <p>{content.page.steps.step3}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-primary font-bold">4</div>
                  <p>{content.page.steps.step4}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-primary font-bold">5</div>
                  <p>{content.page.steps.step5}</p>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="font-semibold">{content.page.mobilepay}: <span className="text-primary text-xl">12345678</span></p>
              </div>
            </div>
            
            <div className="flex justify-center bg-white p-8 rounded-xl shadow-md animate-slide-up">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">{content.page.qrCode.title}</h3>
                <div className="w-64 h-64 mx-auto border-4 border-blue-500 rounded-lg bg-white flex items-center justify-center">
                  {/* Placeholder for MobilePay QR code - This would be replaced with actual QR code image */}
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-600">{content.page.qrCode.placeholder}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Donors Section - Empty */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">{content.page.topDonors}</h2>
          
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">#</th>
                    <th className="px-6 py-3 text-left">{language === 'da' ? 'Navn' : 'Name'}</th>
                    <th className="px-6 py-3 text-right">{content.page.amount} ({content.page.currency})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Empty state - No donors yet */}
                  <tr>
                    <td colSpan={3} className="px-6 py-16 text-center text-gray-500 italic">
                      {language === 'da' ? 'Ingen donationer endnu. Vær den første!' : 'No donations yet. Be the first!'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 italic">
              {content.page.thanks}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Donate;
