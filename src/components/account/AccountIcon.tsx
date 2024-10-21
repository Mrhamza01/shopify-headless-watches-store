'use client'

import { User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const AccountIcon = () => {
  return (
    <Link href="/account">
      <Button variant="ghost" size="icon">
        <User className="h-6 w-6" />
      </Button>
    </Link>
  )
}