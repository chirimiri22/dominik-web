import { useEffect, useState } from 'react'

type LocationState = {
  pathname: string
  search: string
}

export const useLocation = (): LocationState => {
  const [loc, setLoc] = useState<LocationState>({ pathname: window.location.pathname, search: window.location.search })
  useEffect(() => {
    const onPop = () => setLoc({ pathname: window.location.pathname, search: window.location.search })
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return loc
}

export const useNavigate = () => {
  return (path: string) => {
    history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }
}

