import styled from 'styled-components';
import { PageProps } from './styleTypes';


const SIDEBAR_WIDTH = 400;

export const InputField = styled.input`
  font-family: 'Inter';
  background: inherit;
  outline: none;
  border: none;
  color: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 4px 0;
`;

export const InputContainer = styled.div`
  background-color: #131313;
  padding: 12px 16px;
  border-radius: 10px;
  box-sizing: border-box;
  width: 100%;
`;

export const InputLabel = styled.label`
  color: #8f8f8f;
  font-size: 14px;
  margin: 4px 0;
`;

export const Button = styled.button`
  width: 100%;
  background-color: #2b09ff;
  color: #fff;
  outline: none;
  border: none;
  font-size: 16px;
  border-radius: 10px;
  font-family: 'Inter';
  padding: 25px 0;
  font-weight: 500;
  transition: 250ms background-color ease;

  &:hover {
    cursor: pointer;
    background-color: #3415ff;
  }
  &:active {
    background-color: #3a1cff;
  }
`;

export const Page = styled.div<PageProps>`
  height: 100%;
  background-color: #1a1a1a;
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;


export const ConversationSidebarStyle = styled.aside`
  background-color: #1a1a1a;
  border-right: 1px solid #5454543d;
  height: 100%;
  width: ${SIDEBAR_WIDTH}px;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    /* width: 10px;
    height: 5px; */
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    /* background-color: #2d2d2d; */
  }
`;

export const ConversationSidebarHeader = styled.header`
    position: fixed;
    top: 0;
    left:0;
    width: ${SIDEBAR_WIDTH}px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #151515;
    height: 100px;
    padding: 0px 32px;
    box-sizing: border-box;
    border-bottom: 1px solid #5454543d;
    & h1 {
      font-weight: 500;
    }
`;

export const ConversationChannelPageStyle = styled.div`
  height: 100%;
  margin-left: ${SIDEBAR_WIDTH}px;
`;

export const ConversationPannelStyle = styled.div`
  height: 100%;
  margin-left: ${SIDEBAR_WIDTH}px;
`;


export const ConversationSidebarContainer = styled.div`

  
`;

export const ConversationSidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 18px;
  border-bottom: 1px solid #5454543d;
  box-sizing: border-box;
  background-color: #131313;
  cursor: pointer;
`;