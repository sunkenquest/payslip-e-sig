import { defineStore } from "pinia";
import { PdfSignState } from "../../types/interfaces/states/pdf_sign_state";
import { EventStatus } from "../../types/enums/status";
import { PDFDocument, rgb } from "pdf-lib";

export const usePdfSignStore = defineStore('pdfSignStore', {
  state: (): PdfSignState => ({
    status: EventStatus.initial,
    pdf: null,
    signedPdf: '',
    signature: null,
    error: '',
  }),
  actions: {
    uploadPdf(file: File) {
      this.pdf = file;
    },

    async SignPdf() {
      const strSignature = localStorage.getItem('signature');

      if (!this.pdf) {
        this.error = 'There is no uploaded pdf file';
        return;
      }

      if (!strSignature) {
        this.error = 'There is no existing signature data';
        return;
      }

      try {
        const arrayBuffer = await this.pdf.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);

        const page = pdfDoc.getPage(0)
        const { width, height } = page.getSize();
        const signatureImage = await pdfDoc.embedPng(strSignature);

        const signatureDims = signatureImage.scale(0.5);
        const x = width / 2 - signatureDims.width / 2;
        const y = height / 2 - signatureDims.height / 2;

        page.drawImage(signatureImage, {
          x: 150,
          y: 215,
          width: signatureDims.width,
          height: signatureDims.height,
        });

        // ? This will be used if the suignature requires a printed name under it
        // page.drawText('Signed by [Your Name]', {
        //   x: width / 2,
        //   y: y - 30,
        //   size: 12,
        //   color: rgb(0, 0, 0),
        // });

        const pdfBytes = await pdfDoc.save();

        this.signedPdf = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
        console.log(this.signedPdf);
      } catch (error) {
        this.error = `Failed To load pdf ${error}`;
      }

    },
  },
}); 
 