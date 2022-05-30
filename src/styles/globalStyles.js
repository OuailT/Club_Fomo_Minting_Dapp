import styled from "styled-components";

export const Button = styled.button`
    font-family: inherit;
    height: 42px;
    width: 120px;
    background-color: #fff;
    border: none;
    color: #000;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    font-weight: 700;
    font-size: 17px;
    margin-top: 10px;
    &:hover {
      background-color: #dce7ff;
      letter-spacing: 2px;
    }

    @media (max-width:320px) {
      height: 38px;
      width: 100px;
      font-size: 16px;
    }
`;