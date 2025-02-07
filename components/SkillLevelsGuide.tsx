import React from 'react';
import { Trophy, Star, Users } from 'lucide-react';
const SkillLevelsGuide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Тоглох түвшингээ сонгох заавар</h1>
          <p className="text-xl text-blue-800/70">Доорх төрлүүдэд дурдсан тодорхойлолтуудаас үндэслэж сонголтоо хийнэ үү!</p>
        </div>

        {/* Skill Levels Grid */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Level 3 - Beginner */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full -mr-20 -mt-20"></div>
            <div className="relative">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-900">Анхан шат</h2>
              </div>
              <ul className="space-y-3 text-blue-800/70">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                    Шинээр суралцаж эхэлж байгаа
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                    Ширээн теннисний ерөнхий мэдлэгтэй
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                    Тэмцээний туршлагагүй тоглогчид
                </li>
              </ul>
            </div>
          </div>


          {/* Level 2 - Intermediate */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full -mr-20 -mt-20"></div>
            <div className="relative">
              <div className="flex items-center space-x-3 mb-6">
                <Star className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-900">Сонирхогч буюу дунд шат</h2>
              </div>
              <ul className="space-y-3 text-blue-800/70">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                    Тэмцээний тодорхой хэмжээний туршлагатай
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                    Өмнө зохиогдсон анхан шатны тэмцээнд шөвгийн 4т багтаж байсан
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                    Тогтмол бэлтгэл хийдэг
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                    Спортын 2 болон 3-р зэрэгтэй байж болно
                </li>
              </ul>
            </div>
          </div>

           {/* Level 1 - Advanced */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full -mr-20 -mt-20"></div>
            <div className="relative">
              <div className="flex items-center space-x-3 mb-6">
                <Trophy className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-900">Ахисан шат</h2>
              </div>
              <ul className="space-y-3 text-blue-800/70">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                    Спортын зэрэгтэй (1 болон түүнээс дээш)
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                    Өмнө зохиогдсон дунд буюу сонирхогчийн төрөлд эхний 2т багтсан
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                    Мөн саналаараа орох боломжтой
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Bottom Note */}
        <div className="mt-12 bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-white/50">
          <h3 className="text-xl font-bold text-red-900 mb-4">Анхаар!</h3>
          <p className="text-orange-800/70">
            Шударга тоглолтыг хангахын тулд ахисан түвшний хүмүүс анхан шатны түвшинд өрсөлдөхөөс татгалзаж, өөрсдийн ур чадварын түвшинд тохирсон ангиллыг сонгохыг уриалж байна.
          </p>
          <p className="text-blue-800/70 mt-8">
            Оролцож буй төрлийнхөө дээд түвшинд тоглох боломж хүн бүрд нээлттэй. Нэмэлт хураамж - $20
          </p>
        </div>

        <a
          className="bg-white text-blue-900 mt-8 px-8 py-6 rounded-full font-bold hover:bg-blue-50 transition-all transform hover:scale-100 content-center"
          href={"https://form.jotform.com/250357439190055"}
          target="_blank"

        >
          Бүртгүүлэх
      </a>
      </div>
    </div>
  );
};

export default SkillLevelsGuide;