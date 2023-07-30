import { NewsBody } from "../interfaces";
import { UIItem, Text, Image, Link } from "../interfaces";

export function cutText(text: string, maxSymbols = 80): string {
  if (text.length <= maxSymbols + 3) return text;
  const idx = text.indexOf(" ", maxSymbols - 1);
  return `${text.substring(0, idx)}...`;
}

export function formatDate(dateInString: string): string {
  const date = dateInString.split(".");
  if (date.length < 3) return dateInString;
  return `${date[2]}.${date[1]}.${date[0]}`;
}

export function parseNewsBody(body: string): NewsBody {
  const content = [] as NewsBody;

  body = removeSpecialSymbols(body);
  const htmlElements = getHtmlElements(body);
  if (!htmlElements) return [createUIItem(body)];

  let htmlElementIdx = 0;
  while (htmlElementIdx < htmlElements.length) {
    const idx = body.indexOf(htmlElements[htmlElementIdx]);
    if (idx !== 0) {
      content.push(createDefaultText(body.substring(0, idx - 1)));
    }
    content.push(createUIItem(htmlElements[htmlElementIdx]));
    body = body.substring(idx + htmlElements[htmlElementIdx].length);
    htmlElementIdx++;
  }

  if (body !== "") content.push(createDefaultText(body));

  return content;
}

function removeSpecialSymbols(text: string) {
  return text
    .replace(/<\/?br>|<br\/?>|<\/?ul>|<\/?li>/gm, "")
    .replace(/(^[\n]|[\n]$)/gm, "");
}

function getHtmlElements(body: string) {
  return body.match(/(<img.*?\/>|<a.*?<\/a>|<h3>.*?<\/h3>)/gm);
}

function createUIItem(item: string): UIItem {
  if (item.startsWith("<img")) return createImage(item);
  if (item.startsWith("<a")) return createLink(item);
  if (item.startsWith("<h3")) return createSubTitle(item);

  return createDefaultText(item);
}

function createDefaultText(item: string): Text {
  return { type: "text", weight: "Regular", content: item };
}

function createSubTitle(item: string): Text {
  return {
    type: "text",
    weight: "Medium",
    content: item.substring(4, item.length - 5),
  };
}

function createImage(item: string): Image | Text {
  const src = getImageSrc(item);
  return !src ? createDefaultText(item) : { type: "image", src };
}

function getImageSrc(imgElement: string) {
  const src = imgElement.match(/http.*?(png|jpg)/);
  if (!src) return null;
  return src[0];
}

function createLink(item: string): Link | Text {
  const href = getLinkHref(item);
  const label = getLinkLabel(item);
  return !href || !label
    ? createDefaultText(item)
    : { type: "link", href, label };
}

function getLinkHref(linkElement: string) {
  const href = linkElement.match(/http.*?\"/);
  if (!href) return null;
  return href[0].substring(0, href[0].length - 1);
}

function getLinkLabel(linkElement: string) {
  const label = linkElement.match(/>.*?</);
  if (!label) return null;
  return label[0].substring(1, label[0].length - 1);
}
