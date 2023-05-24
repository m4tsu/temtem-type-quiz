import type { FC, PropsWithChildren } from 'react'

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className="container mx-auto px-6">{children}</div>
}
