const pdfContainer = document.getElementById('pdf-render');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');

let pdfDoc = null;
let pageNum = 1;
const scale = 1.5;

function renderPage(num) {
    pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({ scale });
        pdfContainer.height = viewport.height;
        pdfContainer.width = viewport.width;

        const renderContext = {
            canvasContext: pdfContainer.getContext('2d'),
            viewport
        };

        page.render(renderContext);
    });

    pageNum = num;
}

function prevPage() {
    if (pageNum <= 1) return;
    renderPage(pageNum - 1);
}

function nextPage() {
    if (pageNum >= pdfDoc.numPages) return;
    renderPage(pageNum + 1);
}

prevPageButton.addEventListener('click', prevPage);
nextPageButton.addEventListener('click', nextPage);

const pdfUrl = 'Geeta.pdf'; // Replace with the actual PDF URL
pdfjsLib.getDocument(pdfUrl).promise.then(pdfDocument => {
    pdfDoc = pdfDocument;
    renderPage(1);
});
