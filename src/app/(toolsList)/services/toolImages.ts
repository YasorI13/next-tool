import { http } from "@/services/http-service";

export async function listToolImages(asset: string) {
  const res = await http.get(`/toolsdata/${asset}/images`);
  return res.data;
}

export async function uploadToolImage(asset: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await http.post(`/toolsdata/${asset}/images`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteToolImage(asset: string, filename: string) {
  const res = await http.delete(`/toolsdata/${asset}/images`, { params: { filename } });
  return res.data;
}
