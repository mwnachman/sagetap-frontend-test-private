export async function getArtwork(id: number) {
  return fetch('https://api.artic.edu/api/v1/artworks/' + id);
}

export function getImageUrl(id: string) {
  return 'https://www.artic.edu/iiif/2/' + id + '/full/843,/0/default.jpg';
}
