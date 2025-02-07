/* ------------------------- ESSE COMPONENTE É PARA ME AJUDAR A DEBUGAR ------------------------- */

import styled from "styled-components"
import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import PixBox from "./pixBox"

const HelpSc = styled(motion.div)`
    position: absolute;
    right: 10px;
    top: 10px;
    width: 40px;
    height: 40px;
    color: white;
    font-size: 30px;
    font-weight: 500;
    border-radius: 50%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
`

export default function Help() {
  const [animate, setAnimate] = useState(false)
  const isRender = useRef(false)

  //Only aplly the animation after the page is render and the eventlistener to close the animation
  useEffect(()=>{
    isRender.current = true;

    function closeAnimate(){
      setAnimate(false);
    }

    window.addEventListener("click", closeAnimate)
    return () => {
      window.removeEventListener("click", closeAnimate);
    }
  },[])

  //Only start the animation, the exit is handle by the eventListener
  function handleClick(event: React.MouseEvent){
    event.stopPropagation()
    !animate && setAnimate(!animate)
  }

  return (
    <HelpSc
      whileHover={ !animate ? {cursor: "pointer"}: ""}
      animate={
        // Start the animation
        animate && isRender.current ?
        {
          x: [0,"-46.5vw", "-46.5vw"],
          y: [0, "50vh","50vh"],
          borderRadius: ["50%","50%","5%"],
          width: ["40px","40px","60px"],
          backgroundColor: ["#000000","#4d4d4d","#d4d2d2"],
          scale: [1, 15],
          transition: {
            duration: 1,
            times: [0, 0.3, 1]                      
          },
        } 
        // End the animation
        : !animate  && isRender.current ?
        {
          x: ["-46.5vw","-46.5vw",0],
          y: ["50vh","50vh",0],
          borderRadius: ["5%","50%","50%"],
          width: ['60px',"40px","40px"],
          backgroundColor: ["#d4d2d2","#4d4d4d","black"],
          color: ["white"],
          scale: [15,1],
          transition: {
            duration: 1,
          }
        } 
        : ""
      }
      onClick={handleClick}
    >
      {
        !animate ?
          "?" :
          <PixBox setAnimate={setAnimate}/>
       }
    </HelpSc>
  )
}
