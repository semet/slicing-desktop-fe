import { createContext, FC, ReactNode, useContext } from 'react'

import { TPlayer } from '@/schemas/player'

type LayoutContextType = {
  player?: TPlayer
  accessToken?: string
}

type ProviderProps = {
  children: ReactNode
  value: {
    player?: TPlayer
    accessToken?: string
  }
}

const UserContext = createContext<LayoutContextType | null>(null)

const UserProvider: FC<ProviderProps> = ({ children, value }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export { UserProvider, useUser }
