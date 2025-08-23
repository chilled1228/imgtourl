'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Trash2, Copy, Download, Search, Eye, Grid, List, Filter, 
  SortAsc, SortDesc, CheckSquare, Square, MoreHorizontal,
  Image, FileVideo, FileText, File, Calendar, HardDrive,
  Archive, RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { formatBytes } from '@/lib/utils';

interface MediaFile {
  key: string;
  size?: number;
  lastModified?: string;
  url: string;
  etag?: string;
  extension?: string;
  type?: string;
  isImage?: boolean;
  isVideo?: boolean;
  isDocument?: boolean;
}

interface MediaResponse {
  files: MediaFile[];
  isTruncated: boolean;
  nextContinuationToken?: string;
  count: number;
  totalSize: number;
  typeStats: Record<string, number>;
  filters: {
    sortBy: string;
    sortOrder: string;
    fileType: string;
  };
}

export default function MediaManagementPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [stats, setStats] = useState({ count: 0, totalSize: 0 });
  const [typeStats, setTypeStats] = useState<Record<string, number>>({});
  
  // Filtering and sorting
  const [sortBy, setSortBy] = useState('lastModified');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [fileType, setFileType] = useState('all');
  
  // Bulk operations
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);
  
  // Modal state
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const authenticate = async () => {
    try {
      const response = await fetch('/api/media/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
        toast.success('Authenticated successfully');
        loadMediaFiles();
      } else {
        toast.error(data.error || 'Invalid password');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error('Authentication failed');
    }
  };

  const loadMediaFiles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        sortBy,
        sortOrder,
        fileType,
        limit: '200',
      });

      const response = await fetch(`/api/media?${params}`, {
        headers: {
          'x-media-password': password,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load media files');
      }

      const data: MediaResponse = await response.json();
      setFiles(data.files);
      setStats({ count: data.count, totalSize: data.totalSize });
      setTypeStats(data.typeStats);
      setSelectedFiles(new Set()); // Reset selection
      setSelectAll(false);
    } catch (error) {
      console.error('Error loading media files:', error);
      toast.error('Failed to load media files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadMediaFiles();
    }
  }, [sortBy, sortOrder, fileType, isAuthenticated]);

  const deleteFile = async (key: string) => {
    if (!confirm('Are you sure you want to delete this file?')) {
      return;
    }

    try {
      const response = await fetch(`/api/media?key=${encodeURIComponent(key)}`, {
        method: 'DELETE',
        headers: {
          'x-media-password': password,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete file');
      }

      toast.success('File deleted successfully');
      loadMediaFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Failed to delete file');
    }
  };

  const bulkDelete = async () => {
    if (selectedFiles.size === 0) {
      toast.error('No files selected');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedFiles.size} files?`)) {
      return;
    }

    setBulkLoading(true);
    try {
      const response = await fetch('/api/media?bulk=true', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-media-password': password,
        },
        body: JSON.stringify({ keys: Array.from(selectedFiles) }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete files');
      }

      const result = await response.json();
      toast.success(`${result.count} files deleted successfully`);
      loadMediaFiles();
    } catch (error) {
      console.error('Error deleting files:', error);
      toast.error('Failed to delete files');
    } finally {
      setBulkLoading(false);
    }
  };

  const bulkDownload = async () => {
    if (selectedFiles.size === 0) {
      toast.error('No files selected');
      return;
    }

    if (selectedFiles.size > 100) {
      toast.error('Cannot download more than 100 files at once');
      return;
    }

    setBulkLoading(true);
    try {
      const response = await fetch('/api/media/bulk-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-media-password': password,
        },
        body: JSON.stringify({ keys: Array.from(selectedFiles) }),
      });

      if (!response.ok) {
        throw new Error('Failed to create download archive');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `media-files-${new Date().toISOString().slice(0, 10)}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(`Downloaded ${selectedFiles.size} files as ZIP`);
    } catch (error) {
      console.error('Error downloading files:', error);
      toast.error('Failed to download files');
    } finally {
      setBulkLoading(false);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFileSelection = (key: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setSelectedFiles(newSelected);
    setSelectAll(newSelected.size === filteredFiles.length && filteredFiles.length > 0);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedFiles(new Set());
      setSelectAll(false);
    } else {
      setSelectedFiles(new Set(filteredFiles.map(f => f.key)));
      setSelectAll(true);
    }
  };

  const filteredFiles = files.filter(file =>
    file.key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (file: MediaFile) => {
    if (file.isImage) return <Image className="h-4 w-4" />;
    if (file.isVideo) return <FileVideo className="h-4 w-4" />;
    if (file.isDocument) return <FileText className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-green-500';
      case 'video': return 'bg-blue-500';
      case 'document': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Media Management</CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Enter password to access media files
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Password is set in environment variables (MEDIA_ADMIN_PASSWORD)
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && authenticate()}
            />
            <Button onClick={authenticate} className="w-full">
              Access Media
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Media Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your uploaded media files - Available in all environments
          </p>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Files</p>
                  <p className="text-2xl font-bold">{stats.count}</p>
                </div>
                <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Grid className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Size</p>
                  <p className="text-2xl font-bold">{formatBytes(stats.totalSize)}</p>
                </div>
                <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <HardDrive className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Images</p>
                  <p className="text-2xl font-bold">{typeStats.image || 0}</p>
                </div>
                <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Image className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Videos</p>
                  <p className="text-2xl font-bold">{typeStats.video || 0}</p>
                </div>
                <div className="h-12 w-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <FileVideo className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Selected</p>
                  <p className="text-2xl font-bold">{selectedFiles.size}</p>
                </div>
                <div className="h-12 w-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <CheckSquare className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* File Type Filter */}
            <Select value={fileType} onValueChange={setFileType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="File Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Files</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lastModified">Date Modified</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="size">Size</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Order */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </Button>

            {/* View Mode */}
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>

            <Button onClick={loadMediaFiles} disabled={loading} size="sm">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedFiles.size > 0 && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="font-medium">{selectedFiles.size} files selected</span>
                  <Button variant="outline" size="sm" onClick={toggleSelectAll}>
                    {selectAll ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={bulkDownload}
                    disabled={bulkLoading}
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Download ZIP
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={bulkDelete}
                    disabled={bulkLoading}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Selected
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Files Display */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading media files...</p>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchTerm ? 'No files match your search.' : 'No media files found.'}
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFiles.map((file) => (
              <Card key={file.key} className="overflow-hidden">
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                  <div className="absolute top-2 left-2 z-10">
                    <Checkbox
                      checked={selectedFiles.has(file.key)}
                      onCheckedChange={() => toggleFileSelection(file.key)}
                    />
                  </div>
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className={getFileTypeColor(file.type || 'other')}>
                      {file.extension?.toUpperCase()}
                    </Badge>
                  </div>
                  {file.isImage ? (
                    <img
                      src={file.url}
                      alt={file.key}
                      className="w-full h-full object-cover cursor-pointer"
                      loading="lazy"
                      onClick={() => {
                        setSelectedFile(file);
                        setShowDetailsModal(true);
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        {getFileIcon(file)}
                        <p className="text-sm text-muted-foreground mt-2">
                          {file.extension?.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <p className="font-medium text-sm truncate" title={file.key}>
                      {file.key}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{file.size ? formatBytes(file.size) : 'Unknown'}</span>
                      {file.lastModified && (
                        <span>{new Date(file.lastModified).toLocaleDateString()}</span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyUrl(file.url)}
                        className="flex-1"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadFile(file.url, file.key)}
                        className="flex-1"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedFile(file);
                          setShowDetailsModal(true);
                        }}
                        className="flex-1"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteFile(file.key)}
                        className="flex-1"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="p-4 bg-muted/50 flex items-center gap-4">
                  <Checkbox
                    checked={selectAll}
                    onCheckedChange={toggleSelectAll}
                  />
                  <div className="grid grid-cols-12 gap-4 flex-1 text-sm font-medium">
                    <div className="col-span-5">Name</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Size</div>
                    <div className="col-span-2">Modified</div>
                    <div className="col-span-1">Actions</div>
                  </div>
                </div>
                {filteredFiles.map((file) => (
                  <div key={file.key} className="p-4 flex items-center gap-4 hover:bg-muted/50">
                    <Checkbox
                      checked={selectedFiles.has(file.key)}
                      onCheckedChange={() => toggleFileSelection(file.key)}
                    />
                    <div className="grid grid-cols-12 gap-4 flex-1 items-center">
                      <div className="col-span-5 flex items-center gap-3">
                        {file.isImage ? (
                          <img
                            src={file.url}
                            alt={file.key}
                            className="w-10 h-10 object-cover rounded"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                            {getFileIcon(file)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-medium truncate" title={file.key}>
                            {file.key}
                          </p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Badge className={getFileTypeColor(file.type || 'other')}>
                          {file.extension?.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">
                        {file.size ? formatBytes(file.size) : 'Unknown'}
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">
                        {file.lastModified 
                          ? new Date(file.lastModified).toLocaleDateString()
                          : 'Unknown'
                        }
                      </div>
                      <div className="col-span-1 flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyUrl(file.url)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => downloadFile(file.url, file.key)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedFile(file);
                            setShowDetailsModal(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteFile(file.key)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* File Details Modal */}
        <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>File Details</DialogTitle>
            </DialogHeader>
            {selectedFile && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    {selectedFile.isImage ? (
                      <img
                        src={selectedFile.url}
                        alt={selectedFile.key}
                        className="w-full rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          {getFileIcon(selectedFile)}
                          <p className="text-lg font-medium mt-4">{selectedFile.extension?.toUpperCase()}</p>
                          <p className="text-muted-foreground">File Preview Not Available</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">File Name</label>
                      <p className="text-sm text-muted-foreground break-all">{selectedFile.key}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">File Size</label>
                      <p className="text-sm text-muted-foreground">
                        {selectedFile.size ? formatBytes(selectedFile.size) : 'Unknown'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">File Type</label>
                      <p className="text-sm text-muted-foreground">
                        {selectedFile.extension?.toUpperCase()} ({selectedFile.type})
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Last Modified</label>
                      <p className="text-sm text-muted-foreground">
                        {selectedFile.lastModified 
                          ? new Date(selectedFile.lastModified).toLocaleString()
                          : 'Unknown'
                        }
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Public URL</label>
                      <div className="flex gap-2">
                        <Input 
                          value={selectedFile.url} 
                          readOnly 
                          className="text-sm"
                        />
                        <Button
                          size="sm"
                          onClick={() => copyUrl(selectedFile.url)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => downloadFile(selectedFile.url, selectedFile.key)}
                        className="flex-1"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setShowDetailsModal(false);
                          deleteFile(selectedFile.key);
                        }}
                        className="flex-1"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
