import { defineStore } from "pinia";
import { EventStatus } from "../../types/enums/status";
import { SignatureState } from "../../types/interfaces/states/signature_state";

export const useSignatureStore = defineStore('signatureStore', {
  state: (): SignatureState => ({
    status: EventStatus.initial,
    base64Image: null,
    convImg: null,
    error: '',
  }),
  actions: {
    async uploadSignature(img: File) {
      if (img.type !== 'image/png') {
        this.error = 'Only PNG images are allowed';
        this.status = EventStatus.failed;
      } 
      this.base64Image = await this.convertToBase64(img);
      localStorage.setItem('signature', this.base64Image);
    },

    convertToBase64(img: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            resolve(reader.result as string);
          } else {
            reject(new Error("Failed to convert image to Base64"));
          }
        };

        reader.onerror = () => {
          reject(new Error("Error reading the file"));
        };

        reader.readAsDataURL(img);
      });
    },

    removeSavedSignature() {
      localStorage.removeItem('signature');
      console.log('Successfully Removed saved signature');
    },

    convertBase64ToFile(base64: string, filename: string) {
      const arr = base64.split(',');
      const mime = arr[0].match(/:(.*?);/)![1];
      const bstr = atob(arr[1]);
      const n = bstr.length;
      const u8arr = new Uint8Array(n);

      for (let i = 0; i < n; i++) {
        u8arr[i] = bstr.charCodeAt(i);
      }

      this.convImg = new File([u8arr], filename, { type: mime });
    },
  },
});
