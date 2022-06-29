import axios from 'axios';
import { PLATFORM_SERVER_BASE_URL } from '../../config';

const axiosInstance = axios.create({
  baseURL: `${PLATFORM_SERVER_BASE_URL}/api/deduction-files`,
});

const getFiles = async () => {
  const url = '';
  const files = await axiosInstance.get(url)
    .then((response) => response.data);
  return files;
};

const uploadFiles = async (filesToUpload: File[]) => {
  await Promise.all(filesToUpload.map(async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const url = '';
    await axiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }));
};

export {
  getFiles, uploadFiles,
};
