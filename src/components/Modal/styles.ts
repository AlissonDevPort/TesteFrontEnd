import styled from "styled-components";
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: rgb(128, 128, 128);
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
  position: relative;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  cursor: pointer;
  right: 10px;
  background-color:white;
  padding:5px;
  border-radius:8px;
`;
