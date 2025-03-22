import Link from "next/link"

import { Button } from "@/components/ui/button"

function page() {
  return (
    <div className="bg-blue-50 p-8 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">
        Бүртгэл амжилттай!
      </h2>
      <p className="text-blue-700 mb-4">Бүртгүүлсэнд баярлалаа!</p>

      <Link href="/registry">
        <Button
          variant="secondary"
          className="bg-blue-600 text-white px-8 py-6 rounded-full font-bold hover:bg-blue-700 transition-all transform hover:scale-105"
        >
          Дахин бүртгэх
        </Button>
      </Link>
    </div>
  )
}
export default page
