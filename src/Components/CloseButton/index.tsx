import styled from "styled-components"

/* --------------------------------------------- CSS -------------------------------------------- */
export const CloseButtonSc = styled.div<CloseButtonScProps>`
    height: ${({$size})=>($size ? $size : "5px")};
    width: ${({$size})=>($size ? $size : "5px")};
    border-radius: 50%;
    background-color: #fe5f58;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover{
        background-color: #f31d12;
    }

    div{
        display: ${({$hasCenterDot})=>($hasCenterDot ? "inline" : "none")};
        height: 20%;
        width: 20%;
        border-radius: 50%;
        background-color: #5d5959;
    }
`

/* ----------------------------------------- INTERFACES ----------------------------------------- */
interface CloseButtonScProps{
    $size?: string
    $hasCenterDot?: boolean
}

interface CloseButtonProps{
    size?: string
    hasCenterDot?: boolean
}

/* ------------------------------------------ COMPONENT ----------------------------------------- */
export default function CloseButton({size,hasCenterDot}: CloseButtonProps) {
  return (
    <CloseButtonSc
        $size={size}
        $hasCenterDot={hasCenterDot}
    >
       <div></div>
    </CloseButtonSc>
  )
}
