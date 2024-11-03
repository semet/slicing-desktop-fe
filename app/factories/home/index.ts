export const homeKeys = {
  bannerCarousel: ['banner-carousel'] as const,
  lastPlayedGames: ['last-played-games'] as const,
  favoriteGames: ['favorite-games'] as const,
  promotions: (params?: Record<string, unknown>) =>
    ['promotions', params] as const
}
