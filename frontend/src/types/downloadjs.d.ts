declare module 'downloadjs' {
  const download: (data: BlobPart, filename?: string, mimeType?: string) => void;
  export default download;
}