/* ------------------------- ESSE COMPONENTE É PARA ME AJUDAR A DEBUGAR ------------------------- */

import styled from "styled-components"
import helpIcon from "../../assets/help.png"
import { usePagPdfContext } from "../../Context/pagPdf/pagPdft"
import { useLinhasContext } from "../../Context/linhas/linhas"
import { motion } from "motion/react"
import { useConferenciasContext } from "../../Context/conferencias"

const HelpSc = styled(motion.img)`
    position: absolute;
    right: 10px;
    top: 10px;
    width: 40px;
    cursor: pointer;
`

export default function Help() {
    const pagpdf = usePagPdfContext()
    const linhas = useLinhasContext()
    const conferencias = useConferenciasContext()

    function handleClick(){
        // conferencias.logs()
    }

  return (
    <HelpSc
        whileHover={{ scale: 1.3 }}         //Framer-motion
        onClick={handleClick} 
        src={helpIcon}
        alt="help-icon"
    />
  )
}
