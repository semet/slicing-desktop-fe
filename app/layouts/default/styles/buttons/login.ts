import { CSSProperties } from 'react'

import { DesktopStyle } from '@/schemas/general'
import { hexOf } from '@/utils'

export const makeButtonStyle = (
  styles: DesktopStyle['desktop_button_login']
) => {
  const colorStyle: CSSProperties = {
    '--login-button-background-color': hexOf(
      styles.login_button_background_color
    ).withOpacity(styles.login_button_background_opacity),
    '--login-button-background-hover-color': hexOf(
      styles.login_button_background_hover_color
    ).withOpacity(styles.login_button_background_hover_opacity),
    '--login-button-background-active-color': hexOf(
      styles.login_button_background_selected_color
    ).withOpacity(styles.login_button_background_selected_opacity)
  }

  const buttonXs: CSSProperties = {
    '--login-button-text': hexOf(styles.login_button_text_color).withOpacity(
      styles.login_button_text_opacity
    ),
    ...(styles.style_options === 'color'
      ? {
          ...colorStyle
        }
      : {
          '--login-button-xs-background-image': `url(${styles.login_button_image_xs})`
        })
  }

  const buttonSm: CSSProperties = {
    '--login-button-text': hexOf(styles.login_button_text_color).withOpacity(
      styles.login_button_text_opacity
    ),
    '--login-button-border-color': hexOf(
      styles.login_button_border_color
    ).toRgb(),
    ...(styles.style_options === 'color'
      ? {
          ...colorStyle
        }
      : {
          '--login-button-background-image': `url(${styles.login_button_image_xs})`
        })
  }

  const buttonLg: CSSProperties = {
    '--login-button-text': hexOf(styles.login_button_text_color).withOpacity(
      styles.login_button_text_opacity
    ),
    '--login-button-border-color': hexOf(
      styles.login_button_border_color
    ).toRgb(),
    ...(styles.style_options === 'color'
      ? {
          ...colorStyle
        }
      : {
          '--login-button-lg-background-image': `url(${styles.login_button_image_large})`
        })
  }

  return {
    buttonXs,
    buttonSm,
    buttonLg
  }
}
