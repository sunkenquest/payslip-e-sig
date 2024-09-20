import { defineStore } from "pinia";
import { PdfSignState } from "../../types/interfaces/states/pdf_sign_state";
import { EventStatus } from "../../types/enums/status";

export const usePdfSignStore = defineStore('pdfSignStore', {
  state: (): PdfSignState => ({
    status: EventStatus.initial,
    pdf: null,
    signature: null,
    error: '',
  }),
  actions: {
    SignPdf() {
      const signature = localStorage.getItem('signature');

      if (signature !== null) {
        console.log('This is from locastorage' + signature);
      } else {
        console.log('there are no existing signature');
      }
    },
  },
}); 

// <template>
//   <div>
//     <h1>PDF Signer</h1>
//     <input type="file" @change="loadPdf" accept="application/pdf" />
//     <button @click="signPdf" :disabled="!pdfData">Sign PDF</button>
//     <iframe v-if="signedPdfUrl" :src="signedPdfUrl" width="600" height="400"></iframe>
//   </div>
// </template>

// <script>
// import { ref, computed } from 'vue';
// import { usePdfStore } from '../stores/pdfStore';
// import { PDFDocument, rgb } from 'pdf-lib';

// export default {
//   setup() {
//     const pdfStore = usePdfStore();
//     const signedPdfUrl = ref(null);
//     const pdfData = computed(() => pdfStore.pdfData);

//     const loadPdf = (event) => {
//       const file = event.target.files[0];
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const pdfBytes = new Uint8Array(e.target.result);
//         pdfStore.setPdfData(pdfBytes);
//       };
//       reader.readAsArrayBuffer(file);
//     };

//     const signPdf = async () => {
//       if (!pdfData.value) return;

//       const pdfDoc = await PDFDocument.load(pdfData.value);
//       const page = pdfDoc.getPages()[0];
//       const { width, height } = page.getSize();

//       // Replace with your actual base64 signature
//       const base64Signature = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'; // Truncated for brevity
//       const signatureImage = await pdfDoc.embedPng(base64Signature);

//       const signatureDims = signatureImage.scale(0.5); // Scale the image if necessary
//       const x = width / 2 - signatureDims.width / 2; // Center the signature
//       const y = height / 2 - signatureDims.height / 2; // Center the signature

//       // Draw the signature image onto the PDF
//       page.drawImage(signatureImage, {
//         x,
//         y,
//         width: signatureDims.width,
//         height: signatureDims.height,
//       });

//       // Optionally, add text
//       page.drawText('Signed by [Your Name]', {
//         x: width / 2,
//         y: y - 30, // Adjust position above the signature
//         size: 12,
//         color: rgb(0, 0, 0),
//       });

//       const pdfBytes = await pdfDoc.save();
//       signedPdfUrl.value = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
//     };

//     return { loadPdf, signPdf, signedPdfUrl, pdfData };
//   },
// };
// </script>
