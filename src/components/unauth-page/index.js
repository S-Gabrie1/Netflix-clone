"use client"

import { signIn } from 'next-auth/react'
import React from 'react'

export default function UnauthPage() {
  return (
    <div className=' flex h-screen  justify-center items-center' >
      <div className = ' border  px-[1.5em] py-[0.5em] border-gray-100 cursor-pointer  flex justify-center items-center'>
        <button  onClick={() => signIn('github')}>Sign In</button>

      </div>
    </div>
  )
}
