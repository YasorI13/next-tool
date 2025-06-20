import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const IMAGE_DIR = path.join(process.cwd(), "uploads");

const MIME_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ asset: string; filename: string }> }
) {
  const { filename } = await params;

  try {
    const filePath = path.join(IMAGE_DIR, filename);
    const resolved = path.resolve(filePath);

    if (!resolved.startsWith(IMAGE_DIR)) {
      return new NextResponse("Invalid path", { status: 400 });
    }

    const data = await fs.readFile(resolved);
    const ext = path.extname(filename).replace(".", "").toLowerCase();
    const type = MIME_TYPES[ext] || "application/octet-stream";

    return new NextResponse(Buffer.from(data), {
      status: 200,
      headers: {
        "Content-Type": type,
      },
    });
  } catch (err) {
    console.error("Error reading image:", err);
    return new NextResponse("Not found", { status: 404 });
  }
}
