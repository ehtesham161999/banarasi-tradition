import { useState, useEffect } from 'react'
import { getHomeSections } from '../api/api'

export const useHomeSections = () => {
  const [sections, setSections] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getHomeSections()
      .then((res) => setSections(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return { sections, loading }
}