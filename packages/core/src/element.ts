import cx from "clsx"
import { bordered } from "."
import { coloring, elementType, focusType, miscType, modelType, responsive, rotateTransform, spacing, spacingType, transitionType, translate } from "./generator"

interface Config {
  className?: string,
  model?: modelType,
  element?: elementType,
  focus?: focusType,
  transition?: transitionType,
  misc?: miscType,
  spacing?: spacingType
}

export function element(config: Config): string {
  const className = []

  if (config.className !== undefined) className.push(config.className)

  if (config.element !== undefined) {
    const e = config.element
    const cls = cx(
      e.aspectRatio !== undefined && `aspect-${["auto", "square", "video"].includes(e.aspectRatio) ? e.aspectRatio : `[${e.aspectRatio}]`}`,
      (e.transform !== undefined && e.transform) && "transform",
      e.objectFit !== undefined && `object-${e.objectFit}`,
      e.rotate !== undefined && rotateTransform(e.rotate),
      e.scale?.all !== undefined && `scale-${e.scale.all}`,
      e.scale?.x !== undefined && `scale-x-${e.scale.x}`,
      e.scale?.y !== undefined && `scale-y-${e.scale.y}`,
      e.translate !== undefined && translate(e.translate)
    )

    if (cls !== "") className.push(cls)
  }

  if (config.focus !== undefined) {
    const f = config.focus
    const cls = cx(
      f.focusOutline !== undefined && `focus:outline-${f.focusOutline}`,
      f.focusColor !== undefined && `focus:${coloring("bg", f.focusColor, f.focusColorContrast)}`,
      (f.focusDarkColor && f.dark) !== undefined && `dark:focus:${coloring("bg", f.focusDarkColor, f.focusDarkColorContrast)}`,
      f.focusTextColor !== undefined && `focus:${coloring("text", f.focusTextColor, f.focusTextColorContrast)}`,
      (f.focusDarkTextColor && f.dark) !== undefined && `dark:focus:${coloring("text", f.focusDarkTextColor, f.focusDarkTextColorContrast)}`,
      f.focusBorderWidth !== undefined && `focus:${bordered(f.focusBorderPosition, f.focusBorderWidth)}`,
      f.focusBorderColor !== undefined && `focus:${coloring("border", f.focusBorderColor, f.focusBorderColorContrast)}`,
      f.focusRingWidth !== undefined && `focus:${f.focusRingWidth === "normal" ? "ring" : `ring-${f.focusRingWidth}`}`,
      f.focusRingColor !== undefined && `focus:ring-${coloring("ring", f.focusRingColor, f.focusRingColorContrast)}`,
      f.focusRingOffset !== undefined && `focus:${f.focusRingOffset === "normal" ? "ring-offset" : `ring-offset-${f.focusRingOffset}`}`,
      f.focusRingOffsetColor !== undefined && `focus:ring-offset-${coloring("ring", f.focusRingOffsetColor, f.focusRingOffsetColorContrast)}`,
    )

    if (cls !== "") className.push(cls)
  }

  if (config.model !== undefined) {
    const m = config.model
    const cls = cx(
      m.display !== undefined && m.display,
      m.float !== undefined && `float-${m.float}`,
      (m.flowRoot !== undefined && m.flowRoot) && `flow-root`,
      m.overflow !== undefined && `overflow-${m.overflow}`,
      m.overflowX !== undefined && `overflow-x-${m.overflowX}`,
      m.overflowY !== undefined && `overflow-y-${m.overflowY}`,
      responsive(undefined, m.width, m.height)
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
      m.userSelect !== undefined && `select-${m.userSelect}`,
      (m.divideX !== undefined && m.divideX === "normal") && "divide-x",
      (m.divideX !== undefined && m.divideX !== "normal") && `divide-x-${m.divideX}`,
      (m.divideY !== undefined && m.divideY === "normal") && "divide-y",
      (m.divideY !== undefined && m.divideY !== "normal") && `divide-y-${m.divideY}`
    )

    if (cls !== "") className.push(cls)
  }

  return cx(...className)
}
