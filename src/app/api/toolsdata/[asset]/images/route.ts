import { NextRequest } from "next/server";
import path from "path";
import fs from "fs/promises";

const IMAGE_DIR = path.join(process.cwd(), "public", "tool-images");

export async function GET(request: NextRequest, { params }: { params: Promise<{ asset: string }> }) {
  try {
    const files = await fs.readdir(IMAGE_DIR);
    const { asset } = await params
    const images = files.filter((name) => name.startsWith(`${asset}_`));
    return new Response(JSON.stringify(images), { status: 200 });
  } catch (error) {
    console.error("Error listing images:", error);
    return new Response("Failed to list images", { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ asset: string }> }) {
  try {
    const form = await request.formData();
    const { asset } = await params
    const file = form.get("file") || form.get("image");
    if (!file || !(file instanceof Blob)) {
      return new Response("No file provided", { status: 400 });
    }

    await fs.mkdir(IMAGE_DIR, { recursive: true });
    const files = await fs.readdir(IMAGE_DIR);
    const existing =  files.filter((name) => name.startsWith(`${asset}_`));
    if (existing.length >= 3) {
      return new Response("Image limit reached", { status: 400 });
    }
    const numbers = existing.map((n) => parseInt(n.split("_")[1]));
    const next = [1, 2, 3].find((n) => !numbers.includes(n));
    if (!next) {
      return new Response("Image limit reached", { status: 400 });
    }
    const ext = (file as File).name.split('.').pop() || "jpg";
    const filename = `${asset}_${String(next).padStart(2, "0")}.${ext}`;
    const buffer = Buffer.from(await (file as File).arrayBuffer());
    await fs.writeFile(path.join(IMAGE_DIR, filename), buffer);
    return new Response(JSON.stringify({ filename }), { status: 200 });
  } catch (error) {
    console.error("Error uploading image:", error);
    return new Response("Failed to upload", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const filename = request.nextUrl.searchParams.get("filename");
    if (!filename) return new Response("filename required", { status: 400 });
    await fs.unlink(path.join(IMAGE_DIR, filename));
    return new Response("deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting image:", error);
    return new Response("Failed to delete", { status: 500 });
  }
}
