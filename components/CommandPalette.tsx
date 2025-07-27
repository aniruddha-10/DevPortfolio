"use client"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { sections } from "@/lib/data"
import { useEffect } from "react"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSectionChange: (sectionId: string) => void
}

export function CommandPalette({ open, onOpenChange, onSectionChange }: CommandPaletteProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === "k") {
          e.preventDefault()
          onOpenChange(true)
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onOpenChange])

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Jump to section..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Sections">
          {sections.map((section) => (
            <CommandItem key={section.id} onSelect={() => onSectionChange(section.id)} className="cursor-pointer">
              <section.icon className="mr-2 h-4 w-4" />
              <span>{section.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
