import { base, ColorProps, ModelProps, ResponsiveProps, SpacingProps, StandardProps, VisualProps, VisualTextProps } from "@zenbu-ui/core"
import { ThemeCtx } from "@zenbu-ui/provider"
import { createContext, useId } from "@zenbu-ui/react-id"
import * as React from "react"
import { ButtonGroupItem, ButtonGroupItemProps } from "./button-group-item"

export interface ButtonGroupProps extends StandardProps, ResponsiveProps, ColorProps, ModelProps, VisualProps, VisualTextProps, SpacingProps {
  fluid?: boolean,
  disabled?: boolean
}

const PROVIDER_NAME = "ButtonGroup"

export let useContext: ButtonGroupProps
export const ButtonGroup: React.FC<ButtonGroupProps> & {
  Item: React.FC<ButtonGroupItemProps>
} = (props) => {
  const { dark } = React.useContext(ThemeCtx)
  const id = useId("button-group")

  const [ButtonGroupProvider, ButtonGroupContext] = createContext<ButtonGroupProps>(PROVIDER_NAME, {
    id: id,
    dark: dark,
    color: props.color,
    colorContrast: props.colorContrast,
    colorHover: props.colorHover,
    colorHoverContrast: props.colorHoverContrast,
    darkColor: props.darkColor,
    darkColorContrast: props.darkColorContrast,
    darkColorHover: props.darkColorHover,
    darkColorHoverContrast: props.darkColorHoverContrast,
    textColor: props.textColor,
    textColorContrast: props.textColorContrast,
    darkTextColor: props.darkTextColor,
    darkTextColorContrast: props.darkTextColorContrast,
    bgGradientFromColor: props.bgGradientFromColor,
    bgGradientFromColorContrast: props.bgGradientFromColorContrast,
    bgGradientMiddleColor: props.bgGradientMiddleColor,
    bgGradientMiddleColorContrast: props.bgGradientMiddleColorContrast,
    bgGradientEndColor: props.bgGradientEndColor,
    bgGradientEndColorContrast: props.bgGradientEndColorContrast,
    border: props.border,
    borderWidth: props.borderWidth,
    borderStyle: props.borderStyle,
    borderColor: props.borderColor,
    borderColorContrast: props.borderColorContrast,
    rounded: props.rounded,
    fontSize: props.fontSize,
    fontWeight: props.fontWeight,
    px: props.px,
    py: props.py,
    pb: props.pb,
    pl: props.pl,
    pr: props.pr,
    pt: props.pt
  })
  useContext = ButtonGroupContext(PROVIDER_NAME)

  const cls = base({
    model: {
      display: "inline-block",
      width: props.fluid ? "full" : props.width,
      overflow: "hidden"
    },
    positioning: {
      position: "relative"
    },
    flexbox: {
      flex: true,
    },
    responsive: {
      sm: props.sm,
      md: props.md,
      lg: props.lg,
      xl: props.xl,
      "2xl": props["2xl"]
    },
    visual: {
      dark: false,
      borderRadius: props.rounded,
      borderWidth: props.border ? props.borderWidth : undefined,
      borderStyle: props.border ? props.borderStyle : undefined,
      borderColor: props.border ? props.borderColor : undefined,
      borderColorContrast: props.border ? props.borderColorContrast : undefined,
      shadow: props.shadow,
      shadowColor: props.shadow !== undefined ? props.shadowColor : undefined,
      shadowColorContrast: props.shadow !== undefined ? props.shadowColorContrast : undefined,
      shadowOpacity: props.shadow !== undefined ? props.shadowOpacity : undefined,
      darkShadowColor: props.shadow !== undefined ? props.darkShadowColor : undefined,
      darkShadowColorContrast: props.shadow !== undefined ? props.darkShadowColorContrast : undefined,
      darkShadowOpacity: props.shadow !== undefined ? props.darkShadowOpacity : undefined,
    },
    spacing: {
      mx: props.mx,
      my: props.my,
      mb: props.mb,
      ml: props.ml,
      mr: props.mr,
      mt: props.mt
    }
  })

  return(
    <ButtonGroupProvider>
      <div
      id={id}
      className={cls}
      role="group">
        {props.children}
      </div>
    </ButtonGroupProvider>
  )
}

ButtonGroup.Item = ButtonGroupItem

ButtonGroup.defaultProps = {
  width: "max",
  fluid: false,
  disabled: false,
  color: "blue",
  colorContrast: "500",
  textColor: "white",
  border: false,
  borderWidth: "normal",
  borderStyle: "solid",
  shadowColor: "gray",
  shadowColorContrast: "400",
  shadowOpacity: 50,
  fontSize: "sm",
  fontWeight: "normal",
  rounded: "md",
  px: "4",
  py: "2"
}
