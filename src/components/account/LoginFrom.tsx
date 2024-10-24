'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginCustomer } from '@/lib/shopify'
import { useRouter } from 'next/navigation'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const { customerAccessToken, customerUserErrors } = await loginCustomer(email, password)
      if (customerAccessToken) {
        // Store the access token in localStorage or a secure cookie
        localStorage.setItem('customerAccessToken', customerAccessToken.accessToken)
        // Redirect to the Shopify account page
        window.location.href = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/account`
      } else if (customerUserErrors.length > 0) {
        setError(customerUserErrors[0].message)
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" className="w-full">
        Log in
      </Button>
    </form>
  )
}