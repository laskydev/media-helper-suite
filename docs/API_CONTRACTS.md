# API Contracts

This document defines the API contracts for the PDFCraft API server.

## Base URL

```
Development: http://localhost:4000
Production:  TBD
```

## Authentication

Currently, the API does not require authentication. Authentication will be added in Phase 2.

## Common Headers

### Request Headers
```
Content-Type: multipart/form-data (for file uploads)
Content-Type: application/json (for JSON requests)
```

### Response Headers
```
Content-Type: application/json
Content-Type: application/pdf (for PDF responses)
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong",
  "statusCode": 400
}
```

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request (validation error, missing parameters)
- `413` - Payload Too Large (file size exceeds limit)
- `500` - Internal Server Error

## Endpoints

### Health Check

Check if the API is running.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### PDF Health Check

Check if the PDF service is running.

**Endpoint:** `GET /pdf/health`

**Response:**
```json
{
  "status": "ok",
  "service": "pdf-api"
}
```

---

### Merge PDFs

Combine multiple PDF files into a single PDF document.

**Endpoint:** `POST /pdf/merge`

**Request:**

Content-Type: `multipart/form-data`

**Fields:**
- `files` (required, multiple): PDF files to merge (minimum 2 files)
- `filename` (optional): Name for the output file (default: "merged.pdf")

**Example using curl:**
```bash
curl -X POST http://localhost:4000/pdf/merge \
  -F "files=@file1.pdf" \
  -F "files=@file2.pdf" \
  -F "files=@file3.pdf" \
  -F "filename=combined.pdf" \
  -o output.pdf
```

**Example using JavaScript:**
```javascript
const formData = new FormData();
formData.append('files', file1);
formData.append('files', file2);
formData.append('filename', 'merged.pdf');

const response = await fetch('http://localhost:4000/pdf/merge', {
  method: 'POST',
  body: formData,
});

const blob = await response.blob();
```

**Success Response:**

Content-Type: `application/pdf`

Headers:
```
Content-Disposition: attachment; filename="merged.pdf"
```

Body: Binary PDF data

**Error Responses:**

1. Missing files:
```json
{
  "success": false,
  "error": "At least 2 PDF files are required",
  "statusCode": 400
}
```

2. Invalid file type:
```json
{
  "success": false,
  "error": "Invalid file type: image/png. Only PDF files are allowed.",
  "statusCode": 400
}
```

3. File too large:
```json
{
  "success": false,
  "error": "File size exceeds maximum allowed size of 52428800 bytes",
  "statusCode": 413
}
```

4. Processing error:
```json
{
  "success": false,
  "error": "Failed to process PDF: Invalid PDF structure",
  "message": "Failed to merge PDFs",
  "statusCode": 500
}
```

---

## File Constraints

### Size Limits
- Maximum file size: 50 MB (52,428,800 bytes) per file
- Configurable via `MAX_FILE_SIZE` environment variable

### File Types
- Accepted: `application/pdf` only
- Extensions: `.pdf`

### File Retention
- Temporary files are stored in `/tmp` directory
- Files are automatically deleted after 30 minutes (configurable via `FILE_TTL`)
- Cleanup runs every 10 minutes

## Rate Limiting

Not implemented in Phase 1. Will be added in future phases.

## CORS

CORS is enabled for the configured origin (default: `http://localhost:3000`)

Configure via `CORS_ORIGIN` environment variable.

## Future Endpoints

### Split PDF (Phase 2)
```
POST /pdf/split
```

### Compress PDF (Phase 2)
```
POST /pdf/compress
```

### Convert PDF (Phase 2)
```
POST /pdf/convert
```

### Rotate PDF (Phase 2)
```
POST /pdf/rotate
```

### Protect PDF (Phase 3)
```
POST /pdf/protect
```

## Versioning

API version is not included in URLs for simplicity in Phase 1.

Future versions will use:
```
/v1/pdf/merge
/v2/pdf/merge
```

## Testing

### Using Postman

1. Create a new POST request
2. Set URL to `http://localhost:4000/pdf/merge`
3. Go to Body tab
4. Select "form-data"
5. Add key "files" (set type to File)
6. Select multiple PDF files
7. Click Send
8. Save the response as a PDF file

### Using Python

```python
import requests

files = [
    ('files', open('file1.pdf', 'rb')),
    ('files', open('file2.pdf', 'rb'))
]

response = requests.post(
    'http://localhost:4000/pdf/merge',
    files=files
)

with open('merged.pdf', 'wb') as f:
    f.write(response.content)
```

## Monitoring

Health check endpoints can be used for monitoring:

```bash
# Simple health check
curl http://localhost:4000/health

# PDF service health check
curl http://localhost:4000/pdf/health
```

Expected response time: < 100ms

## Change Log

### Version 0.1.0 (Current)
- Initial API release
- Merge PDF endpoint
- Health check endpoints
- File size validation
- Automatic file cleanup
