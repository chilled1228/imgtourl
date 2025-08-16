import { Code, Upload, Key, Globe, Shield, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          API Documentation
        </h1>
        <p className="text-xl text-muted-foreground">
          Integrate ImageURL into your applications with our simple REST API
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="sdks">SDKs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <p className="text-muted-foreground mb-4">
              The ImageURL API allows you to upload images programmatically and receive shareable URLs. 
              All API endpoints are RESTful and return JSON responses.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  Base URL
                </h3>
                <code className="block p-2 bg-muted rounded text-sm">
                  https://imageurl.app/api
                </code>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Rate Limits
                </h3>
                <p className="text-sm text-muted-foreground">
                  10 requests per hour per IP
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Upload className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold">File Upload</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload images up to 10MB in JPG, PNG, GIF, WEBP, or SVG format
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Auto Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatic image compression and format optimization
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Globe className="w-5 h-5 text-purple-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Global CDN</h3>
                  <p className="text-sm text-muted-foreground">
                    Images served from Cloudflare's global network
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Secure</h3>
                  <p className="text-sm text-muted-foreground">
                    Built-in security and malware scanning
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Upload Endpoint</h2>
            
            <div className="space-y-4">
              <div>
                <Badge variant="secondary">POST</Badge>
                <code className="ml-2 text-sm">/api/upload</code>
              </div>
              
              <p className="text-muted-foreground">
                Upload an image file and receive a shareable URL.
              </p>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-3">Request</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Content-Type</h4>
                <code className="block p-2 bg-muted rounded text-sm">
                  multipart/form-data
                </code>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Parameters</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Parameter</th>
                        <th className="text-left p-2">Type</th>
                        <th className="text-left p-2">Required</th>
                        <th className="text-left p-2">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2"><code>file</code></td>
                        <td className="p-2">File</td>
                        <td className="p-2">Yes</td>
                        <td className="p-2">Image file to upload</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-3">Response</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Success (200)</h4>
                <pre className="p-4 bg-muted rounded text-sm overflow-x-auto">
{`{
  "id": "abc123def456",
  "url": "https://images.imageurl.app/abc123def456.jpg",
  "fileName": "1640995200000-abc123.jpg",
  "originalName": "my-image.jpg",
  "size": 245760,
  "originalSize": 512000,
  "contentType": "image/jpeg",
  "optimized": true,
  "uploadedAt": "2025-01-01T12:00:00.000Z"
}`}
                </pre>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Error (400/429/500)</h4>
                <pre className="p-4 bg-muted rounded text-sm overflow-x-auto">
{`{
  "error": "File size exceeds 10MB limit"
}`}
                </pre>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Code Examples</h2>
            
            <Tabs defaultValue="curl" className="space-y-4">
              <TabsList>
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="php">PHP</TabsTrigger>
              </TabsList>
              
              <TabsContent value="curl">
                <pre className="p-4 bg-muted rounded text-sm overflow-x-auto">
{`curl -X POST https://imageurl.app/api/upload \\
  -F "file=@/path/to/your/image.jpg" \\
  -H "Content-Type: multipart/form-data"`}
                </pre>
              </TabsContent>
              
              <TabsContent value="javascript">
                <pre className="p-4 bg-muted rounded text-sm overflow-x-auto">
{`const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('https://imageurl.app/api/upload', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log('Image URL:', result.url);`}
                </pre>
              </TabsContent>
              
              <TabsContent value="python">
                <pre className="p-4 bg-muted rounded text-sm overflow-x-auto">
{`import requests

with open('image.jpg', 'rb') as f:
    files = {'file': f}
    response = requests.post(
        'https://imageurl.app/api/upload',
        files=files
    )
    
result = response.json()
print(f"Image URL: {result['url']}")`}
                </pre>
              </TabsContent>
              
              <TabsContent value="php">
                <pre className="p-4 bg-muted rounded text-sm overflow-x-auto">
{`<?php
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://imageurl.app/api/upload',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => [
        'file' => new CURLFile('/path/to/image.jpg')
    ]
]);

$response = curl_exec($curl);
$result = json_decode($response, true);

echo "Image URL: " . $result['url'];
curl_close($curl);
?>`}
                </pre>
              </TabsContent>
            </Tabs>
          </Card>
        </TabsContent>

        <TabsContent value="sdks" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Official SDKs</h2>
            <p className="text-muted-foreground mb-6">
              We're working on official SDKs for popular programming languages. 
              In the meantime, you can use the REST API directly or these community libraries.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">JavaScript/Node.js</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Use with any JavaScript framework or Node.js application
                </p>
                <code className="text-sm bg-muted p-2 rounded block">
                  npm install imageurl-js
                </code>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Python</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Python package for easy integration
                </p>
                <code className="text-sm bg-muted p-2 rounded block">
                  pip install imageurl-python
                </code>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Go</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Go module for server-side applications
                </p>
                <code className="text-sm bg-muted p-2 rounded block">
                  go get github.com/imageurl/go-sdk
                </code>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold mb-2">PHP</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Composer package for PHP applications
                </p>
                <code className="text-sm bg-muted p-2 rounded block">
                  composer require imageurl/php-sdk
                </code>
              </Card>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
