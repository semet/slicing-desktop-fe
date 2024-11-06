import { createContext, FC, ReactNode, useContext } from 'react'

import {
  TGameGroupResponse,
  TLanguageSettings,
  TWebMeta,
  TWebSetting
} from '@/schemas/general'
import { TPlayer } from '@/schemas/player'

type LayoutContextType = {
  player?: TPlayer
  webSettings: TWebSetting
  webMeta: TWebMeta
  gameGroup: Promise<TGameGroupResponse>
  languageSettings: Promise<TLanguageSettings>
  accessToken?: string
  language?: string
}

type ProviderProps = {
  children: ReactNode
  data: {
    player?: TPlayer
    webSettings: TWebSetting
    webMeta: TWebMeta
    gameGroup: Promise<TGameGroupResponse>
    languageSettings: Promise<TLanguageSettings>
    accessToken?: string
    language?: string
  }
}

const LayoutContext = createContext<LayoutContextType | null>(null)

const LayoutProvider: FC<ProviderProps> = ({ children, data }) => {
  return (
    <LayoutContext.Provider value={data}>{children}</LayoutContext.Provider>
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
