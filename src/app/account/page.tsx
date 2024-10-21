import { LoginForm } from "@/components/account/LoginFrom"
export default function AccountPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Account</h1>
      <LoginForm />
    </div>
  )
}