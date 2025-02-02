import React from 'react'
import Badge from '../components/ui/badge'
import { Calendar, MapPin, Trophy } from 'lucide-react';

function TournamentBanner() {
  const categories = ['Эрэгтэй ганцаарчилсан /анхан шат/', 'Эрэгтэй ганцаарчилсан /сонирхогч шат/', 'Эрэгтэй ганцаарчилсан /ахисан/',
    'Эмэгтэй ганцаарчилсан /анхан шат/', 'Холимог хос', 'Багийн төрөл'
  ]

  const handleRegister = ()=> {
    console.log("Registry button clicked")
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="relative rounded-4xl overflow-hidden mb-16 shadow-xl">
          <img
            src="/dc.png"
            alt="Table Tennis Championship"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/50 to-transparent">
            <div className="absolute top-0 left-0 p-12 max-w-4xl">
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              АМЕРИК ДАХЬ МОНГОЛЧУУДЫН 14 ДЭХ ШИРЭЭНИЙ ТЕННИСНИЙ АВАРГА ШАЛГАРУУЛАХ ТЭМЦЭЭН
              </h1>
              <button onClick={handleRegister} className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 hover:shadow-xl">
                Бүртгүүлэх
              </button>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Event Details */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-white/50">
              <h2 className="text-3xl font-bold text-blue-900 mb-6">Мэдээлэл</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Calendar className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-blue-900 font-semibold text-lg">Өдөр, цаг</h3>
                    <p className="text-blue-800/70">4 сарын 19 болон 20, 2025</p>
                    <p className="text-blue-800/70">9:00 AM - 8:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-blue-900 font-semibold text-lg">Газар</h3>
                    <p className="text-blue-800/70">18761 N Frederick Ave Unit Q</p>
                    <p className="text-blue-800/70">Gaithersburg, MD 20879</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Trophy className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-blue-900 font-semibold text-lg">Шагнал</h3>
                    <p className="text-blue-800/70">Өргөмжлөл, медал</p>
                    <p className="text-blue-800/70">Мөнгөн шагнал</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-white/50">
              <h2 className="text-3xl font-bold text-blue-900 mb-6">Төрөл</h2>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Badge
                  variant='primary'
                    key={category}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-200 text-sm py-2 px-4"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-white/50 h-fit">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Хөтөлбөр</h2>
            <h3 className="text-2xl font-bold text-blue-800 mb-6 border-b border-blue-100 pb-4">4 сарын 19</h3>
            <div className="space-y-4">
              <div className="border-b border-blue-100 pb-4">
                <h3 className="text-blue-900 font-semibold">Тэмцээний ерөнхий танилцуулга</h3>
                <p className="text-blue-800/70">9:00 AM - Бүртгэл болон танилцуулга</p>
              </div>
              <div className="border-b border-blue-100 pb-4">
                <h3 className="text-blue-900 font-semibold">Тоглолтууд эхэлнэ</h3>
                <p className="text-blue-800/70">10:00 AM - Ганцаарчилсан төрөлийн тоглолтууд эхэлнэ</p>
              </div>
              <div className="border-b border-blue-100 pb-4">
                <h3 className="text-blue-900 font-semibold">Тэмцээний нээлт</h3>
                <p className="text-blue-800/70">12:00 PM - Тэмцээний үндсэн нээлт</p>
              </div>
              <div className="border-b border-blue-100 pb-4">
                <h3 className="text-blue-900 font-semibold">Хасагдах шатны тоглолтууд</h3>
                <p className="text-blue-800/70">3:00 PM - Хасагдах шат, хосын, багийн тоглолтууд эхэлнэ</p>
              </div>
              <div>
                <h3 className="text-blue-900 font-semibold">Хагас финал</h3>
                <p className="text-blue-800/70">5:00 PM - Ганцаарчилсан хагас финалаас бусад бүх тоглолтууд дуусна</p>
              </div>
              <div>
                <h3 className="text-blue-900 font-semibold">Эхний өдөр өндөрлөнө</h3>
                <p className="text-blue-800/70">8:00 PM - Баг болон хосын хагас финалаас бусад бүх тоглолтууд дуусна</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-blue-800 mb-6 border-b border-blue-100 pb-4 mt-8">4 сарын 20</h3>
            <div className="space-y-4">
              <div className="border-b border-blue-100 pb-4">
                <h3 className="text-blue-900 font-semibold">Ганцаарчилсан тоглолтууд</h3>
                <p className="text-blue-800/70">9:30 AM - Ганцаарчилсан хагас финалын тоглолтууд эхэлнэ</p>
              </div>
              <div className="border-b border-blue-100 pb-4">
                <h3 className="text-blue-900 font-semibold">Баг болон хосын тоглолтууд</h3>
                <p className="text-blue-800/70">11:00 AM - Баг болон хосын хагас финалын тоглолтууд эхэлнэ</p>
              </div>
              <div className="border-b border-blue-100 pb-4">
                <h3 className="text-blue-900 font-semibold">Шагнал гардуулалт</h3>
                <p className="text-blue-800/70">1:00 PM - Байр эзэлсэн тоглогчидод шагнал гардуулалт болон тэмцээний хаалт</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-xl">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white mb-2">Та бэлэн үү?</h2>
            <p className="text-white/90">Халуун дулаан, нөхөрсөг тоглолтууд таныг хүлээж байна!</p>
          </div>
          <button className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-all transform hover:scale-105" onClick={handleRegister}>
            Бүртгүүлэх
          </button>
        </div>
      </div>
    </div>
  );
};

export default TournamentBanner