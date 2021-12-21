import * as React from "react"
import { render, RenderResult } from "@testing-library/react"
import { Modal } from "../src"
import { Text } from "../../typography/src"
import userEvent from "@testing-library/user-event"

describe("Standard Modal component", () => {
  let rendered: RenderResult

  const ModalBasic = () => {
    const [visible, setVisible] = React.useState(true)

    return(
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <Text color="gray" colorContrast="800" fontSize="2xl" fontWeight="semibold" mb="2">Show Basic Modal</Text>
        <Text color="gray" colorContrast="500" fontSize="sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
      </Modal>
    )
  }

  beforeEach(() => {
    rendered = render(<ModalBasic />)
  })

  it("should have div element overlay ", () => {
    expect(rendered.container.querySelector("div")).toHaveClass("fixed w-screen h-screen bg-black/50 inset-0")
  })

  it("should have div wrapper element with classname ", () => {
    expect(rendered.container.querySelectorAll("div")[1]).toHaveClass("w-screen h-screen flex justify-center items-center")
  })

  it("should have data focus guard to trap the focus inside modal component", () => {
    expect(rendered.container.querySelectorAll("div")[2]).toHaveAttribute("data-focus-guard", "true")
    expect(rendered.container.querySelectorAll("div")[4]).toHaveAttribute("data-focus-lock-disabled", "false")
  })

  it("should have div element with classname ", () => {
    expect(rendered.container.querySelectorAll("div")[5]).toHaveClass("overflow-hidden w-96 flex flex-col rounded-md")
  })

  it("should have attribute role with value is dialog ", () => {
    expect(rendered.container.querySelectorAll("div")[5]).toHaveAttribute("role", "dialog")
  })

  it("should have attribute aria-modal with value is true", () => {
    expect(rendered.container.querySelectorAll("div")[5]).toHaveAttribute("aria-modal", "true")
  })

  it("should not visible if click the close button", () => {
    const dialog = rendered.container.querySelectorAll("div")[5]
    dialog.querySelector(`span`)?.click()
    expect(rendered.container.querySelectorAll("div")[5]).toBeUndefined()
  })

  it("should not visible if press tab one time and press enter", () => {
    userEvent.tab()
    userEvent.keyboard("{enter}")
    expect(rendered.container.querySelectorAll("div")[5]).toBeUndefined()
  })

  it("should not visible if press escape", () => {
    userEvent.keyboard("{escape}")
    expect(rendered.container.querySelectorAll("div")[5]).toBeUndefined()
  })

  describe("Standard Modal coloring component", () => {
    const ModalColoring = () => {
      const [visible, setVisible] = React.useState(true)

      return(
        <Modal color="blue" colorContrast="500" visible={visible} onClose={() => setVisible(false)}>
          <Text color="gray" colorContrast="800" fontSize="2xl" fontWeight="semibold" mb="2">Show Basic Modal</Text>
          <Text color="gray" colorContrast="500" fontSize="sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
        </Modal>
      )
    }

    beforeEach(() => {
      rendered = render(<ModalColoring />)
    })

    it("should have div element with classname ", () => {
      expect(rendered.container.querySelectorAll("div")[7]).toHaveClass("bg-blue-500 px-4 py-3")
    })
  })

  describe("Standard Modal with Title component", () => {
    const ModalColoring = () => {
      const [visible, setVisible] = React.useState(true)

      return(
        <Modal
        title="Show Modal Dialog"
        titleColor="blue" titleColorContrast="500" visible={visible} onClose={() => setVisible(false)}>
          <Text color="gray" colorContrast="500" fontSize="sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
        </Modal>
      )
    }

    beforeEach(() => {
      rendered = render(<ModalColoring />)
    })

    it("should have div element with classname ", () => {
      expect(rendered.container.querySelectorAll("div")[6]).toHaveClass("flex items-center bg-blue-500 px-4 py-3")
    })

    it("should have text values `Show Modal Dialog` ", () => {
      expect(rendered.container.querySelectorAll("div")[6]).toHaveTextContent("Show Modal Dialog")
    })
  })

  describe("Standard Modal with Footer component", () => {
    const ModalColoring = () => {
      const [visible, setVisible] = React.useState(true)

      return(
        <Modal
        footer="Show Modal Dialog"
        footerColor="blue" footerColorContrast="500" visible={visible} onClose={() => setVisible(false)}>
          <Text color="gray" colorContrast="500" fontSize="sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
        </Modal>
      )
    }

    beforeEach(() => {
      rendered = render(<ModalColoring />)
    })

    it("should have div element with classname ", () => {
      expect(rendered.container.querySelectorAll("div")[8]).toHaveClass("flex items-center bg-blue-500 border-t border-solid border-gray-300 px-4 py-3")
    })

    it("should have text values `Show Modal Dialog` ", () => {
      expect(rendered.container.querySelectorAll("div")[8]).toHaveTextContent("Show Modal Dialog")
    })
  })
})
