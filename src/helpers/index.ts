import { ArtDetails } from '../App';
import { Artwork, artworks as seedArtworks } from '../constants';

export async function getArtwork(id: number) {
  return fetch('https://api.artic.edu/api/v1/artworks/' + id);
}

export function getImageUrl(id: string) {
  return 'https://www.artic.edu/iiif/2/' + id + '/full/843,/0/default.jpg';
}

export async function getSeedArtworks() {
  const artResponses = await Promise.all(
    seedArtworks.map(async (seedArtwork: Artwork) =>
      getArtwork(seedArtwork.id)
        .then((res) => res.json())
        .then((res: ArtDetails) => {
          return res;
        })
        .catch((e) => {
          console.error('Error: ', e);
          return e;
        })
    )
  );
  return artResponses.filter((res) => !!res?.data?.id);
}
