import api from '../api/axios';

/**
 * Uploads an image to IPFS via backend.
 * @param file File to upload
 * @param accessToken JWT string for auth
 */
export async function uploadImageToIPFS(file: File, accessToken: string): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  const resp = await api.post<{ cid: string }>('/ipfs/upload-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return resp.data.cid;
}
