import { useRef, useState } from "react";
import styled from "styled-components";
import * as pdfJsLib from "pdfjs-dist";
import { usePagPdfContext } from "../../Context/pagPdf/pagPdft";
import { useLinhasContext, vLinhasPadrao, vTituloTb } from "../../Context/linhas/linhas";
pdfJsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.7.107/pdf.worker.min.js`;

/* --------------------------------------- ESTILIZACAO CSS -------------------------------------- */
export const UploadBoxSC = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Courier New', Courier, monospace;
    height: 100px;
    width: 500px;
    margin: 20px auto 0  auto;
    background-color: #0096FF;
    border: 1px solid black;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 25px;
    cursor: pointer;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    border-radius: 20px;

    &:hover{
        background-color: black;
        color: white;
    }
`

const Description  = styled.p`
    color: red;
    font-weight: bold;
    margin: auto;

`

/* ----------------------------------------- COMPONENTE ----------------------------------------- */
export default function UploadBox() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);                     //Referenciando o input
    const [desc, setDesc] = useState<null|string>(null)
    const pagPdfProvider = usePagPdfContext()
    const linhasProvider = useLinhasContext()

    //Clica no input e abre a funcao handleFileChange
    function handleClick(){ 
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file:any = event.target.files?.[0];

        //Returning the original state of the tabble and the pdf-data
        linhasProvider.setTituloTb(vTituloTb)
        linhasProvider.setLinhas(vLinhasPadrao())
        pagPdfProvider.setPagPfg(null)

        //Checking if the file is a pdf
        if (file.type !== "application/pdf") {
            setDesc("Please select a valid PDF file.");
            return;
        }

        //Change the description tof the file
        setDesc(file.name);

        //Lendo o arquivo
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file)

        //Carregando o pdf
        fileReader.onload = async (e: any) => {
            const typedArray = new Uint8Array(e.target.result);
            
            //Load the document
            const pdf = await pdfJsLib.getDocument(typedArray).promise;
            getContentPdf(pdf)

        }
      }

      //Extraindo o conteudo do pdf e armazenando como um array de objetos
      async function getContentPdf(pdf: any){

        let extractedText = [];

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
  
            const pageText = textContent.items.map((item: any) => item.str).join(" ");
            extractedText.push({
                pagina: i,
                conteudo: pageText
            })
        }

        pagPdfProvider.setPagPfg(extractedText)
      }


  return (
    <>
        <UploadBoxSC onClick={handleClick}>
            {"Selecione o arquivo NF (PDF)"}
        </UploadBoxSC>
        <Description>{desc}</Description>
        {/* Invisible file input */}
        <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        style={{ display: "none" }}
        onChange={handleFileChange}
        />
    </>
  )
}
