'use client'
import clsx from 'clsx'
import { Text } from 'react-aria-components'
import {
  ComboBox as RAComboBox,
  ListBox,
  Item,
  Input,
  Popover,
  Button,
  Label,
} from 'react-aria-components'

import type { ReactElement, ReactNode } from 'react'
import type {
  ComboBoxProps as RAComboBoxProps,
  ItemProps,
} from 'react-aria-components'

type ComboBoxProps<T extends object> = Omit<RAComboBoxProps<T>, 'children'> & {
  label?: string
  description?: string | null
  errorMessage?: string | null
  children: ReactNode | ((item: T) => ReactElement)
}

// https://react-spectrum.adobe.com/react-aria/ComboBox.html#reusable-wrappers
// children の型が例と違ってうまくいかない
export const ComboBox = <T extends object>(props: ComboBoxProps<T>) => {
  const { label, description, errorMessage, children, ...rest } = props
  return (
    <RAComboBox {...rest}>
      <Label className=" text-red-600">{label}</Label>
      <div className="my-combobox-container">
        <Input />
        <Button>▼</Button>
      </div>
      {description && <Text slot="description">{description}</Text>}
      {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
      <Popover className="border-green400 border border-solid bg-yellow-100">
        <ListBox>{children}</ListBox>
      </Popover>
    </RAComboBox>
  )
}

export const ComboBoxItem = (props: ItemProps) => {
  return (
    <Item
      {...props}
      className={({ isFocused, isSelected }) =>
        clsx(
          'rounded-sm p-2 text-red-600',
          isFocused && 'bg-gray-400',
          isSelected && 'bg-blue-600 font-bold'
        )
      }
    />
  )
}
