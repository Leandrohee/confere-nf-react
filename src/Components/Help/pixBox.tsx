import styled from "styled-components"
import CloseButton from "../CloseButton"
import { useState } from "react"

export const PixBoxSc = styled.div`
    /* background-color: #ff000036; */
    width: 95%;
    height: 95%;

    .divCloseBtn{
        width: 100%;
        /* background-color: yellow; */
        display: flex;
        justify-content: end;
    }

    .pix{
        font-size: 5px;
        color: black;
        text-align: center;
    }

    .valorPix{
        margin-top: 8px;
        font-size: 5px;
        color: #2200ff;
        text-align: center;
    }

`

export default function PixBox({setAnimate}: any) {
    const [showPix, SetShowPix] = useState(false)

    //Only show the content after 1 second
    setTimeout(()=>{
       SetShowPix(true)
    },1000)

  return (
   <PixBoxSc>
        {
            showPix &&
            <>
                <div className="divCloseBtn">
                    <div onClick={() => setAnimate(false) }>
                        <CloseButton size="1.3px" />
                    </div>
                </div>
                <div>
                <p className="pix">
                    Pix do Leandro:
                </p>
                <p className="valorPix">
                    {"(62) 992509445"}
                </p>
                </div>
            </>
        }
   </PixBoxSc>
  )
}
