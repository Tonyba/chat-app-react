import React, { createRef, useEffect, FC } from 'react'
import { OverlayStyle } from '../../utils/styles/index';
import { CreateConversationForm } from '../forms/CreateConversationForm';
import { ModalContainer, ModalHeader, ModalContentBody } from './index';

import { MdClose } from 'react-icons/md'

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateConversationModal: FC<Props> = ({setShowModal}) => {
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setShowModal(false);
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, [])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { current } = ref;
    if(current === e.target) {
      setShowModal(false);
    }
  }

  return (
    <OverlayStyle ref={ref} onClick={ handleOverlayClick } >
        <ModalContainer>    
             <ModalHeader>
                <h2>Create a Conversation</h2>
                <MdClose size={32} onClick={() => setShowModal(false)} />
             </ModalHeader>
             <ModalContentBody>
              <CreateConversationForm setShowModal={setShowModal} />
             </ModalContentBody>
        </ModalContainer>
    </OverlayStyle>
  )
}
