import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Inicializa PDF.js para su uso en react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfViewer() {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);

    function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            setPdfFile(file);
            setPageNumber(1);
        }
    }

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }


    const pages = [];
    if (numPages) {
        for (let i = 1; i <= numPages; i++) {
            pages.push(
                <div key={i}>
                    <Page pageNumber={i} width={400} />
                </div>
            );
        }
    }

    return (
        <div>
            <input type="file" accept=".pdf" onChange={onFileChange} />
            {pdfFile && (
                <div>
                    <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess} >
                        {pages.map((item, i) => (
                            <div key={i}>{item}</div>
                        ))}
                    </Document>
                    <p>
                        Página {pageNumber} de {numPages}
                    </p>

                </div>
            )}
        </div>
    );
}

export default PdfViewer;
