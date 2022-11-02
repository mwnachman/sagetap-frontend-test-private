import { FullArtDetails } from '../App';

export function isFullArtDetail(detail: unknown): detail is FullArtDetails {
  const castArg = detail as FullArtDetails;
  if (castArg?.data?.id) {
    return true;
  }
  return false;
}
