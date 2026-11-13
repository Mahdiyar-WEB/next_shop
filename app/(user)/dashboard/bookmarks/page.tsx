'use client'
import { useCurrentUser } from 'hooks/use-auth';
import React from 'react'

const BookmarksPage = () => {
      const { data, isLoading } = useCurrentUser();
      console.log("🚀 ~ BookmarksPage ~ data:", data)
    
  return (
    <div>BookmarksPage</div>
  )
}

export default BookmarksPage