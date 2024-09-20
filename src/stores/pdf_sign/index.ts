import { defineStore } from "pinia";
import { PdfSignState } from "../../types/interfaces/states/pdf_sign_state";
import { EventStatus } from "../../types/enums/status";
import { PDFDocument } from "pdf-lib";

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
      this.status = EventStatus.loading;
      const strSignature = localStorage.getItem('signature');

      if (!this.pdf) {
        this.error = 'There is no uploaded pdf file';
        this.status = EventStatus.failed;
        return;
      }

      if (!strSignature) {
        this.error = 'There is no existing signature data';
        this.status = EventStatus.failed;
        return;
      }

      try {
        const arrayBuffer = await this.pdf.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);

        const page = pdfDoc.getPage(0)
        // const { width, height } = page.getSize();
        const signatureImage = await pdfDoc.embedPng(strSignature);

        const signatureDims = {
          height: 30,
          width: 90,
        };
        // const x = width / 2 - signatureDims.width / 2;  
        // const y = height / 2 - signatureDims.height / 2;

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
        this.status = EventStatus.success;
      } catch (error) {
        this.error = `Failed To load pdf ${error}`;
        this.status = EventStatus.failed;
      }

    },
  },
}); 
 