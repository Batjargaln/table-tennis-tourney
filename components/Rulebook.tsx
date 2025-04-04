import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Rulebook = () => {
  const rules = {
    goal: [
      "Ширээний теннисний спортыг олон нийтэд сурталчлах, тоглогчдын дундах өрсөлдөөнийг нэмэгдүүлэх, туршлага солилцох, ур чадварыг дээшлүүлэхэд оршино.",
    ],
    rules: [
      "Бүх тоглолтууд 5 үе 11 оноогоор явагдана",
      "Ганцаарчилсан төрлийн тоглолтууд хэсгийн журмаар явна",
      "Хэсэг бүр 3-4 хүнтэй байна",
      "Хэсгээс хамгийн өндөр оноотой 2 тоглогч хагас шигшээд шалгарна",
      "Багийн болон хосын тоглолт хасагдах журмаар явна",
      "Хагас шигшээ тоглолтууд хасагдах журмаар явна",
    ],
    classes: [
      "Эрэгтэй ганцаарчилсан – ахисан шат",
      "Эрэгтай ганцаарчилсан – дунд шат",
      "Эрэгтэй, эмэгтэй ганцаарчилсан -  анхан шат",
      "Эмэгтэй ганцаарчилсан - Ахисан",
      "Холимог хос",
      "Баг",
    ],
    time: ['2025 оны 04 -р сарын 19 – 20 ны өдөр 18761 N Frederick Ave Unit Q, Gaithersburg, MD 20879 зохиогдоно']
  };

  return (
    <Card className="max-w-6xl mx-auto bg-blue-50">
      <CardHeader className="bg-blue-100">
        <CardTitle className="text-2xl font-bold text-blue-900">Тэмцээний дүрэм</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {Object.entries(rules).map(([category, categoryRules]) => (
          <div key={category} className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-800 mb-3 capitalize">
              {category === 'goal' ? 'Зорилго' : category === 'classes' ? 'Төрөл, ангилал' : category === 'rules' ? 'Дүрэм' : category === 'time' && 'Тэмцээн явагдах газар, хугацаа'}
            </h3>
            <div className="space-y-2">
              {categoryRules.map((rule, index) => (
                <div key={index} className="flex items-start text-gray-700">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <p>{rule}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Rulebook;