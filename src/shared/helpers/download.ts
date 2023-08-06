type Params = {
  filename: string;
  content: string;
  mimeType?: string;
  charset?: string;
};
export default function download({
  filename,
  content,
  mimeType = 'text/plain',
  charset = 'utf-8',
}: Params) {
  var element = document.createElement('a');
  element.setAttribute(
    'href',
    `data:${mimeType};charset=${charset},%EF%BB%BF` +
      encodeURIComponent(content),
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
