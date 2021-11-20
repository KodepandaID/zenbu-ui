import cx from "clsx"
import { bordered, coloring, miscType, spacing, spacingType, transitionType, visualTextType, visualType } from "./generator"

interface Config {
  className?: string,
  visual?: visualType,
  visualText?: visualTextType,
  spacing?: spacingType,
  transition?: transitionType,
  misc?: miscType
}

export function text(config: Config): string {
  const className = []

  if (config.className !== undefined) className.push(config.className)

  if (config.visual !== undefined) {
    const v = config.visual
    const cls = cx(
      bordered(v.borderPosition, v.borderWidth),
      coloring("border", v.borderColor, v.borderColorContrast),
      v.borderStyle !== undefined && `border-${v.borderStyle}`,
      v.shadow !== undefined && `shadow-${v.shadow}`,
      v.shadowOffset !== undefined && `shadow-offset-${v.shadowOffset}`
    )

    if (cls !== "") className.push(cls)
  }

  if (config.visualText !== undefined) {
    const v = config.visualText
    const cls = cx(
      v.bgColor !== undefined && coloring("bg", v.bgColor, v.bgColorContrast),
      v.bgColorHover !== undefined && `hover:${coloring("bg", v.bgColorHover, v.bgColorHoverContrast)}`,
      v.textColor !== undefined && coloring("text", v.textColor, v.textColorContrast),
      (v.darkTextColor !== undefined && v.dark) && `dark:${coloring("text", v.darkTextColor, v.darkTextColorContrast)}`,
      v.textHoverColor !== undefined && `hover:${coloring("text", v.textHoverColor, v.textHoverColorContrast)}`,
      (v.darkTextHoverColor !== undefined && v.dark) && `dark:hover:${coloring("text", v.darkTextHoverColor, v.darkTextHoverColorContrast)}`,
      v.fontSize !== undefined && `text-${v.fontSize}`,
      v.fontWeight !== undefined && `font-${v.fontWeight}`,
      v.lineHeight !== undefined && `leading-${v.lineHeight}`,
      v.textAlign !== undefined && `text-${v.textAlign}`,
      v.textDecoration !== undefined && v.textDecoration,
      v.textTransform !== undefined && v.textTransform,
      v.textOverflow !== undefined && v.textOverflow,
      v.wordBreak !== undefined && `break-${v.wordBreak}`
    )

    if (cls !== "") className.push(cls)
  }

  if (config.transition !== undefined) {
    const t = config.transition
    const cls = cx(
      (t.transition !== undefined && t.transition !== "normal") && `transition-${t.transition}`,
      (t.transition !== undefined && t.transition === "normal") && "transition",
      t.duration !== undefined && `duration-${t.duration}`,
      t.ease !== undefined && `ease-${t.ease}`,
      t.delay !== undefined && `delay-${t.delay}`,
      t.animation !== undefined && `animate-${t.animation}`
    )

    if (cls !== "") className.push(cls)
  }

  if (config.spacing !== undefined) {
    const s = config.spacing
    const cls = spacing(s, undefined)

    if (cls !== "") className.push(cls)
  }

  if (config.misc !== undefined) {
    const m = config.misc
    const cls = cx(
      m.cursor !== undefined && `cursor-${m.cursor}`,
      m.opacity !== undefined && `opacity-${m.opacity}`,
      m.userSelect !== undefined && `select-${m.userSelect}`
    )

    if (cls !== "") className.push(cls)
  }

  return cx(...className)
}