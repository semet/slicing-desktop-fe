import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import {
  GameCasino,
  GameCockFight,
  GameEsport,
  GameFishShoot,
  GameGeneral,
  GameLottery,
  GameSlot,
  GameSport
} from '@/components/icons'
import { ObjectIndex } from '@/types'

type Params = {
  size?: number
  center?: boolean
}

export const getGameIcons = (params: Params) => {
  const { size = 35, center = true } = params

  const categoryIcons: ObjectIndex<string, Record<string, ReactNode>> = {
    default: {
      icon: (
        <GameGeneral
          width={size}
          height={size}
          className={twMerge(center && 'mx-auto')}
        />
      )
    },
    sports: {
      icon: (
        <GameSport
          width={size}
          height={size}
          className={twMerge(center && 'mx-auto')}
        />
      )
    },
    slots: {
      icon: (
        <GameSlot
          width={size}
          height={size}
          className={twMerge(center && 'mx-auto')}
        />
      )
    },
    lottery: {
      icon: (
        <GameLottery
          width={size}
          height={size}
          className={twMerge(center && 'mx-auto')}
        />
      )
    },
    games: {
      icon: (
        <GameCasino
          width={size}
          height={size}
          className={twMerge(center && 'mx-auto')}
        />
      )
    },
    fishing: {
      icon: (
        <GameFishShoot
          width={size}
          height={size}
          className={twMerge(center && 'mx-auto')}
        />
      )
    },
    esports: {
      icon: (
        <GameEsport
          width={size}
          height={size}
          className={twMerge(center && 'mx-auto')}
        />
      )
    },
    cockfight: {
      icon: (
        <GameCockFight
          width={size}
          height={size}
          className={twMerge(center && 'mx-auto')}
        />
      )
    },
    casino: {
      icon: (
        <GameCasino
          width={size}
          height={size}
          className={twMerge(center && 'mx-auto')}
        />
      )
    }
  }

  return categoryIcons
}
