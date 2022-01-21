import { AriaProps, base, ColorProps, element, ModelProps, StandardProps, text, VisualProps, VisualTextProps } from "@zenbu-ui/core"
import { ThemeCtx } from "@zenbu-ui/provider"
import { useId } from "@zenbu-ui/react-id"
import * as React from "react"

interface SwitchProps extends AriaProps, StandardProps, ModelProps, ColorProps, VisualTextProps, VisualProps {
  checked?: boolean,
  label?: React.ReactNode,
  onChange?: (value: boolean) => void
}

export const Switch: React.FC<SwitchProps> = (props) => {
  const { dark } = React.useContext(ThemeCtx)
  const node = React.useRef<HTMLDivElement>(null)
  const id = useId("input-switch")

  const [width, setWidth] = React.useState<number>(0)
  const [isOn, setIsOn] = React.useState<boolean>(props.checked === undefined ? false : props.checked)

  const clsWrapper = base({
    model: {
      width: "max"
    },
    positioning: {
      position: "relative"
    },
    flexbox: {
      flex: true,
      alignItems: "center"
    },
    visual: {
      dark: dark,
      bgColor: "gray",
      bgColorContrast: "200",
      darkBgColor: "black",
      borderRadius: "full"
    },
    misc: {
      cursor: "pointer",
      opacity: dark ? "25" : undefined
    },
    spacing: {
      py: "1",
      px: "1"
    }
  })

  const clsForm = base({
    flexbox: props.label !== undefined ? {
      flex: true,
      alignItems: "center"
    } : undefined
  })

  const clsDot = base({
    model: {
      width: props.width,
      height: props.width
    },
    visual: {
      dark: dark,
      bgColor: props.color,
      bgColorContrast: props.colorContrast,
      darkBgColor: props.darkColor,
      darkBgColorContrast: props.darkColorContrast,
      borderRadius: "full"
    }
  })

  const clsLabel = text({
    visualText: {
      dark: dark,
      textColor: props.textColor,
      textColorContrast: props.textColorContrast,
      darkTextColor: props.darkTextColor,
      darkTextColorContrast: props.darkTextColorContrast,
      fontSize: props.fontSize,
      fontWeight: props.fontWeight
    },
    misc: {
      userSelect: "none"
    }
  })

  const clsTransform = element({
    element: {
      transform: true,
      translate: {
        x: isOn ? "full" : "0"
      }
    },
    transition: {
      ease: "in-out",
      duration: "300"
    },
    spacing: {
      ml: isOn ? "2" : undefined
    }
  })

  const toggleSwitch = () => {
    if (props.onChange !== undefined) props.onChange(!isOn)
    setIsOn(!isOn)
  }

  React.useEffect(() => {
    if (node.current?.clientWidth !== undefined && !props.checked) {
      setWidth(node.current.clientWidth * 2)
    } else if (node.current?.clientWidth !== undefined && props.checked) {
      setWidth(node.current.clientWidth * 2 - (8*2))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node])

  return(
    <form className={[
      clsForm,
      props.label !== undefined ? `space-x-3` : ""
    ].join(" ").trim()}>
      {props.label !== undefined && (
        <label htmlFor={id} className={clsLabel}>{props.label}</label>
      )}
      <input
      id={id}
      className="hidden"
      type="checkbox"
      aria-hidden="true"
      tabIndex={-1}
      defaultChecked={props.checked} />
      <div
      ref={node}
      className={clsWrapper}
      role="switch"
      tabIndex={0}
      aria-label={props.ariaLabel}
      aria-checked={isOn}
      onClick={() => toggleSwitch()}
      onKeyDown={(e) => {
        if (e.code === "Enter") toggleSwitch()
      }}
      style={width !== 0 ? {width: `${width}px`} : {}}>
        <div className={[clsDot, clsTransform].join(" ").trim()}></div>
      </div>
    </form>
  )
}

Switch.defaultProps = {
  checked: false,
  width: "6",
  color: "blue",
  colorContrast: "500",
  textColor: "gray",
  textColorContrast: "600"
}