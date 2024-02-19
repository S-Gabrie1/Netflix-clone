"use client"

import { signIn } from 'next-auth/react'
import React from 'react'

export default function UnauthPage() {
  return (
    <div>
        <button onClick={() => signIn('github')}>Sign In</button>
    </div>
  )
}
