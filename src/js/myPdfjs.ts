import * as pdfjs from "pdfjs-dist"

export function useMyPdfjs() {

    function foo() {
        console.log("call foo")
    }

    function init() {
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs'
    }

    function render(pdfPath : String) {
        const loadingTask = pdfjs.getDocument(pdfPath)
        const canvasContainer = <HTMLCanvasElement>document.getElementById("testCanvas")
        loadingTask.promise
            .then(pdf => {
                console.log("success loaded pdf")
                const renderPage = (pageNumber: number) => {
                    pdf.getPage(pageNumber).then(page => {// get page
                        console.log("try to load page", pageNumber)
                        var viewport = page.getViewport({ scale: 1 })
                        // var scale = window.innerHeight / viewport.height
                        // console.log("scale: ", scale)
                        // viewport = page.getViewport({ scale: scale })
                        const canvas = document.createElement('canvas')
                        // canvas.className = 'canvas'
                        canvas.style.width = '100%'
                        var context = <CanvasRenderingContext2D>canvas.getContext('2d')
                        // console.log(viewport.height, window.innerHeight)
                        canvas.height = viewport.height
                        canvas.width = viewport.width

                        page.render({
                            canvasContext: context,
                            viewport: viewport,
                        }).promise.then(() => {
                            canvasContainer.appendChild(canvas)
                        })
                        
                    })
                    
                }
                for (let pageNumber = 1; pageNumber < pdf.numPages; pageNumber++) {
                    renderPage(pageNumber);
                }
            })
    }

    return {
        foo,
        init,
        render,
    }
}