import React, { FC, PropsWithChildren } from 'react'
import { ModalContainerStyle } from '../../utils/styles'
import { ModalHeaderStyle, ModalContentBodyStyle } from '../../utils/styles/index';

export const ModalHeader: FC<PropsWithChildren> = ({children}) => {
  return (
    <ModalHeaderStyle>{children}</ModalHeaderStyle>
  )
}


export const ModalContentBody: FC<PropsWithChildren> = ({children}) => {
    return <ModalContentBodyStyle>{children}</ModalContentBodyStyle>
}

export const ModalContainer: FC<PropsWithChildren> = ({children}) => {
    return <ModalContainerStyle> {children} </ModalContainerStyle>
}