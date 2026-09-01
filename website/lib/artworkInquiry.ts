export const ARTWORK_INQUIRY_PARAM = "artwork";

export function artworkContactHref(ref: string) {
  return `/contact?${ARTWORK_INQUIRY_PARAM}=${encodeURIComponent(ref)}#contact`;
}

export function fillInquiryTemplate(
  template: string,
  work: { title: string; ref: string },
) {
  return template.replaceAll("{title}", work.title).replaceAll("{ref}", work.ref);
}
