import React from "react"

import RegistrationForm from "./RegistrationForm"

function page() {
  return (
    <div className="bg-blue-50 p-8 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">
        Тэмцээний бүртгэл
      </h2>
      <RegistrationForm />
    </div>
  )
}

export default page
