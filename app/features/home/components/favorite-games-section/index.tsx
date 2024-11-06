import { FC } from 'react'

import { GameCard, useGetFavoriteGames } from '@/features/home'
import { TFavoriteGames } from '@/schemas/home'

export const FavoriteGameSection = () => {
  const { data: games } = useGetFavoriteGames()
  return (
    <div className="flex flex-col items-center gap-6 px-4 xl:px-24">
      <h2 className="text-center text-lg font-semibold uppercase text-white">
        Favorite
      </h2>
      <div className="flex flex-wrap justify-center gap-5">
        {games?.data?.map((game) => (
          <GameCard
            key={game.id}
            game={game}
          />
        ))}
      </div>
      <button className="w-40 rounded-full bg-secondary py-3 text-white">
        Lihat Semua
      </button>
    </div>
  )
}
