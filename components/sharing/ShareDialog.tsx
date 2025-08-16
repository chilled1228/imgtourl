'use client';

import { useState, useEffect } from 'react';
import { QrCode, Copy, Share2, Facebook, Twitter, MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import QRCode from 'qrcode';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title?: string;
  type?: 'image' | 'pdf';
}

export default function ShareDialog({ isOpen, onClose, url, title = 'Shared Content', type = 'image' }: ShareDialogProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen && url) {
      generateQRCode();
    }
  }, [isOpen, url]);

  const generateQRCode = async () => {
    try {
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const shareToFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    const text = `Check out this ${type}: ${title}`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const shareToWhatsApp = () => {
    const text = `Check out this ${type}: ${title} ${url}`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
  };

  const shareViaEmail = () => {
    const subject = `Sharing ${type}: ${title}`;
    const body = `Hi!\n\nI wanted to share this ${type} with you: ${title}\n\nYou can view it here: ${url}\n\nBest regards!`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = `qr-code-${type}.png`;
      link.href = qrCodeUrl;
      link.click();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Your {type === 'image' ? 'Image' : 'PDF'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* URL Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Share Link</label>
            <div className="flex gap-2">
              <Input value={url} readOnly className="flex-1" />
              <Button onClick={copyToClipboard} size="sm">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* QR Code */}
          <div className="space-y-2">
            <label className="text-sm font-medium">QR Code</label>
            <div className="flex flex-col items-center space-y-3">
              {qrCodeUrl && (
                <div className="p-4 bg-white rounded-lg border">
                  <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                </div>
              )}
              <Button onClick={downloadQRCode} variant="outline" size="sm">
                <QrCode className="w-4 h-4 mr-2" />
                Download QR Code
              </Button>
            </div>
          </div>

          {/* Social Sharing */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Share on Social Media</label>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={shareToFacebook} variant="outline" className="flex items-center gap-2">
                <Facebook className="w-4 h-4" />
                Facebook
              </Button>
              <Button onClick={shareToTwitter} variant="outline" className="flex items-center gap-2">
                <Twitter className="w-4 h-4" />
                Twitter
              </Button>
              <Button onClick={shareToWhatsApp} variant="outline" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
              <Button onClick={shareViaEmail} variant="outline" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Button>
            </div>
          </div>

          {/* Native Share API (if supported) */}
          {typeof navigator !== 'undefined' && navigator.share && (
            <Button 
              onClick={() => {
                navigator.share({
                  title: title,
                  text: `Check out this ${type}`,
                  url: url,
                });
              }}
              className="w-full"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share via Device
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
