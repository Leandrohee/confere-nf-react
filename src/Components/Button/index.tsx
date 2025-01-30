import { ReactNode } from "react"
import styled from "styled-components"
import { useConferenciasContext } from "../../Context/conferencias"
import { usePagPdfContext } from "../../Context/pagPdf/pagPdft"

/* --------------------------------------- ESTILIZACAO CSS -------------------------------------- */
const ButtonSC = styled.button<SCProps>`

    appearance: none;
    background-color: ${({$backgroundColor})=>($backgroundColor ? $backgroundColor : 'black')};
    border: ${({$border})=>($border ? $border : '2px solid #1A1A1A')};
    border-radius: 15px;
    box-sizing: border-box;
    color: ${({$color})=>($color ? $color : "white")};
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    outline: none;
    text-align: center;
    text-decoration: none;
    transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: ${({$width})=>($width ? $width : '60%')};
    height: ${({$height})=>($height ? $height : "2.5rem")};
    will-change: transform;
    margin: ${({$margin})=>($margin ? $margin : "auto")};
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

    &:disabled {
        pointer-events: none;   
    }

    &:hover {
        color: ${({$hoverColor})=>($hoverColor ? $hoverColor : "white")};
        background-color:${({$hoverBackgroundColor})=>($hoverBackgroundColor? $hoverBackgroundColor : "#000000b1")};
        box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
        transform: translateY(-2px) scale(1.05);
    }

    &:active {
        box-shadow: none;
        transform: translateY(0);
    }
`

/* ---------------------------------- INTERFACES DO COMPONENTE ---------------------------------- */
interface ButtonProps{
    text?: string | ReactNode
    backgroundColor?: string
    border?: string
    width?: string
    height?: string
    hoverBackgroundColor?: string
    color?: string
    hoverColor?:  string
    margin?: string
}

interface SCProps{
    $backgroundColor?: string
    $border?: string
    $width?: string
    $height?: string
    $hoverBackgroundColor?: string
    $color?: string
    $hoverColor?:  string
    $margin?: string
}

/* ----------------------------------------- COMPONENTE ----------------------------------------- */
export function Button(props: ButtonProps){
    const confere = useConferenciasContext()
    const pagpdf = usePagPdfContext()

    function handleClick(){
        //Checking if there is any data in the pdf-data to continuie
        if(pagpdf.pagPdf){
            confere.fazConferencias()
        }
    }

    return(
        <ButtonSC
            onClick={handleClick}
            $backgroundColor={props.backgroundColor}
            $border={props.border}
            $width={props.width}
            $height={props.height}
            $hoverBackgroundColor={props.hoverBackgroundColor}
            $color= {props.color}
            $hoverColor= {props.hoverColor}
            $margin= {props.margin}
        >
            {props.text}    
        </ButtonSC>
    )    
}