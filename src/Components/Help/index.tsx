/* ------------------------- ESSE COMPONENTE É PARA ME AJUDAR A DEBUGAR ------------------------- */

import styled from "styled-components"
import helpIcon from "../../assets/help.png"
import { easeIn, easeInOut, easeOut, motion } from "motion/react"
import { useState } from "react"

const HelpSc = styled(motion.img)`
    position: absolute;
    right: 10px;
    top: 10px;
    width: 40px;
    cursor: pointer;
`

export default function Help() {
  const [animate, setAnimate] = useState(false)

    function handleClick(){
      setAnimate(!animate)
    }

  return (
    <HelpSc
        // whileHover={{ scale: 1.3 }}         //Framer-motion
        animate={animate ? 
          {
            // x: [0,"-95vw","-95vw",0,"-50vw" ],      //Key frames, dont need this right now
            // y: [0,"0vh","90vh","90vh","50vh"],      //key frames dont need this right now
            // rotate: '180deg'                        //Dont need this right now
            x: [0,"-50vw", "-50vw"],
            y: [0, "50vh", "50vh"],
            scale: [1, 10],
            transition: {
              duration: 2,
              // ease: easeInOut,
              times: [0, 0.2, 1]
            },
          } 
          : 
          {
            x: 0,
            y: 0
          }
        }
        onClick={handleClick} 
        src={helpIcon}
        alt="help-icon"
    />
  )
}
