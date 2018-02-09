export function saveFile(filename, base64text, mimeType, sliceSize) {
  function BlobConverter() {
    /**
     * base64转Blob
     * @param {string} b64Data
     * @param {string} contentType
     * @param {number} sliceSize
     */
    function b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    }
    this.getBlob = function(base64text, mimeType, sliceSize) {
      return b64toBlob(base64text, mimeType, sliceSize);
    }
  }
  const blobConverter = new BlobConverter();
  const blob = blobConverter.getBlob(base64text, mimeType, sliceSize);
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    link.download = filename;
    link.href = url;
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }
}
