import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./global.css";
import { LinhaProvider } from './Context/linhas/linhas.tsx';
import { PagPdfProvider } from './Context/pagPdf/pagPdft.tsx';
import { ConferenciasProvider } from './Context/conferencias/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PagPdfProvider> 
      <LinhaProvider>                                       
          <ConferenciasProvider>
            <App />
          </ConferenciasProvider>
        </LinhaProvider>
    </PagPdfProvider>
  </StrictMode>,
)

/*
Conferencias tem acesso ao valor das linhas e das paginas
Linhas tem acesso as valor das págians, mas nao tem acesso ao valor das conferencias
Paginas nao tem acesso ao valor das linhas nem das conferencias
*/
