export const generalKeys = {
  activeStyle: ['active-style'] as const,
  captcha: ['captcha'] as const,
  webSettings: ['web-settings'] as const,
  webMeta: ['web-meta'] as const,
  language: ['language'] as const,
  gameGroup: (params?: string) => ['game-group', params] as const,
  providerGroup: (params?: string) => ['provider-group', params] as const
}
