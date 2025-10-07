"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ImageGalleryUploaderProps {
  propertyId?: string;
  existingImages?: string[];
  onImagesUpdate?: (images: string[]) => void;
}

export default function ImageGalleryUploader({
  propertyId,
  existingImages = [],
  onImagesUpdate,
}: ImageGalleryUploaderProps) {
  const [images, setImages] = useState<string[]>(existingImages);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024 // 5MB limit
    );

    if (validFiles.length !== fileArray.length) {
      alert("Some files were skipped. Only image files under 5MB are allowed.");
    }

    uploadFiles(validFiles);
  };

  const uploadFiles = async (files: File[]) => {
    setUploading(true);
    const newImageUrls: string[] = [];

    try {
      for (const file of files) {
        // Convert to base64 for demo - in real app, upload to cloud storage
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

        const base64 = await base64Promise;
        newImageUrls.push(base64);
      }

      const updatedImages = [...images, ...newImageUrls];
      setImages(updatedImages);
      onImagesUpdate?.(updatedImages);

      // In real app, update database
      if (propertyId) {
        await fetch(`/api/properties/${propertyId}/images`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ images: newImageUrls }),
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading images");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async (imageUrl: string, index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesUpdate?.(updatedImages);

    // In real app, delete from storage and database
    if (propertyId) {
      await fetch(`/api/properties/${propertyId}/images`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      });
    }
  };

  const setMainImage = async (index: number) => {
    const reorderedImages = [...images];
    const [mainImage] = reorderedImages.splice(index, 1);
    reorderedImages.unshift(mainImage);

    setImages(reorderedImages);
    onImagesUpdate?.(reorderedImages);

    // Update database
    if (propertyId) {
      await fetch(`/api/properties/${propertyId}/images`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: reorderedImages }),
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Property Images</span>
          <Badge variant="secondary">
            {images.length} image{images.length !== 1 ? "s" : ""}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-gray-300 dark:border-gray-600"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />

          <div className="space-y-2">
            <svg
              className="w-12 h-12 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Drag & drop images here, or{" "}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-primary font-medium hover:underline"
              >
                click to select
              </button>
            </p>
            <p className="text-xs text-gray-500">
              Supports JPG, PNG, WebP up to 5MB each
            </p>
          </div>
        </div>

        {/* Loading State */}
        {uploading && (
          <div className="text-center py-4">
            <div className="inline-flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span className="text-sm">Uploading images...</span>
            </div>
          </div>
        )}

        {/* Image Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={`Property image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Main Image Badge */}
                {index === 0 && (
                  <Badge
                    className="absolute top-2 left-2 bg-primary text-primary-foreground"
                    variant="default"
                  >
                    Main
                  </Badge>
                )}

                {/* Action Buttons */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                  {index !== 0 && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setMainImage(index)}
                      className="text-xs"
                    >
                      Set Main
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeImage(imageUrl, index)}
                    className="text-xs"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Usage Tips */}
        {images.length === 0 && (
          <div className="text-center py-4 text-sm text-gray-500">
            <p>Add property images to showcase your listing</p>
            <p className="mt-1">
              The first image will be used as the main photo
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
