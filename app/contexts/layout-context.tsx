import { createContext, FC, ReactNode, useContext } from 'react'

import { TDesktopStyleData } from '@/schemas/general'

type LayoutContextType = {
  styles: TDesktopStyleData
}

type ProviderProps = {
  children: ReactNode
  styles: TDesktopStyleData
}

const LayoutContext = createContext<LayoutContextType | null>(null)

const LayoutProvider: FC<ProviderProps> = ({ children, styles }) => {
  return (
    <LayoutContext.Provider value={{ styles }}>
      {children}
    </LayoutContext.Provider>
  )
}

const useLayout = () => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}

export { LayoutProvider, useLayout }
