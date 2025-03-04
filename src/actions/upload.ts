'use server'

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const ALLOWED_MIME_TYPES = {
  'image/jpeg': ['jpg', 'jpeg'],
  'image/png': ['png'],
  'image/gif': ['gif'],
  'application/pdf': ['pdf'],
  'audio/mpeg': ['mp3'],
  'audio/wav': ['wav'],
  // Add more MIME types as needed
};

interface UploadParams {
  buffer: ArrayBuffer;
  filename: string;
  contentType: string;
  
}

function getFileExtension(filename: string, contentType: string): string {
  // First try to get extension from filename
  const fileExt = filename.split('.').pop()?.toLowerCase();
  
  // Verify if the extension matches the content type
  const allowedExts = ALLOWED_MIME_TYPES[contentType as keyof typeof ALLOWED_MIME_TYPES];
  
  if (fileExt && allowedExts?.includes(fileExt)) {
    return fileExt;
  }
  
  // Fallback to first allowed extension for the content type
  return allowedExts?.[0] || 'bin';
}

function generateUniqueFilename(originalFilename: string, contentType: string): string {
  const hash = crypto.createHash('sha256')
    .update(originalFilename + process.hrtime.bigint().toString())
    .digest('hex')
    .slice(0, 8);
  
  const extension = getFileExtension(originalFilename, contentType);
  const baseName = originalFilename.split('.')[0].replace(/[^a-zA-Z0-9]/g, '-');
  
  return `${baseName}-${hash}.${extension}`;
}

export async function uploadFile(params: UploadParams): Promise<{ url: string; error?: never } | { url?: never; error: string }> {
  try {
    // Validate content type
    if (!ALLOWED_MIME_TYPES[params.contentType as keyof typeof ALLOWED_MIME_TYPES]) {
      return { error: 'File type not supported' };
    }

    const uniqueFilename = generateUniqueFilename(params.filename, params.contentType);
    const key = `uploads/${uniqueFilename}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
      Body: Buffer.from(params.buffer),
      ContentType: params.contentType,
      ContentLength: params.buffer.byteLength,
      Metadata: {
        originalName: params.filename,
      },
    });

    await s3.send(command);
    const url = `${process.env.CLOUD_FRONT_URL}/${key}`;
    return { url };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Upload failed' };
  }
}