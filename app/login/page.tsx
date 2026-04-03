import { LoginForm } from '@/components/login-form'

export default function Page() {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center p-6 md:p-10"
      style={{
        background:
          "linear-gradient(165deg, #FFF7FA 0%, #FDF0F5 22%, #F8E8F2 48%, #EEE5F4 74%, #EAE6F5 100%)",
      }}
    >
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
