import { useState } from 'react'

export const useDropdownMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
  }

  const isDropdownActive = (dropdown: string) => {
    return activeDropdown === dropdown
  }

  return {
    activeDropdown,
    handleDropdownToggle,
    closeDropdown,
    isDropdownActive
  }
}

export default useDropdownMenu
