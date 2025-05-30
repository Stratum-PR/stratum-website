
import React, { useState, useRef } from 'react';
import { Upload, X, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  currentImage?: string;
  onImageUpload: (imageData: string) => void;
  onImageRemove: () => void;
  memberName: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImage,
  onImageUpload,
  onImageRemove,
  memberName
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageUpload(result);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
        className="hidden"
      />

      {currentImage ? (
        <div className="relative group">
          <img
            src={currentImage}
            alt={`${memberName} profile`}
            className="w-32 h-32 mx-auto rounded-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleClick}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Camera className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={onImageRemove}
                className="bg-red-500/80 hover:bg-red-500 text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`w-32 h-32 mx-auto rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors duration-200 ${
            isDragging
              ? 'border-primary bg-primary/10'
              : 'border-gray-300 hover:border-primary hover:bg-gray-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          {isUploading ? (
            <div className="text-primary animate-pulse">
              <Upload className="h-8 w-8" />
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <Upload className="h-8 w-8 mx-auto mb-2" />
              <span className="text-xs">Upload Photo</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
