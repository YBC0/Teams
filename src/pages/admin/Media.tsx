import { FC, useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { MediaFile } from '../../types/admin';
import {
  PhotoIcon,
  DocumentIcon,
  VideoCameraIcon,
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
  TagIcon,
} from '@heroicons/react/24/outline';

const Media: FC = () => {
  const { state: { currentLanguage } } = useAdmin();
  const [mediaFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: 'ocean-cleanup.jpg',
      type: 'image/jpeg',
      url: '/media/ocean-cleanup.jpg',
      thumbnailUrl: '/media/thumbnails/ocean-cleanup.jpg',
      size: 2048576,
      dimensions: {
        width: 1920,
        height: 1080,
      },
      tags: ['ocean', 'cleanup', 'environment'],
      uploadedBy: 'admin',
      createdAt: '2024-03-20T10:00:00Z',
      updatedAt: '2024-03-20T10:00:00Z',
    },
    {
      id: '2',
      name: 'team-meeting.mp4',
      type: 'video/mp4',
      url: '/media/team-meeting.mp4',
      thumbnailUrl: '/media/thumbnails/team-meeting.jpg',
      size: 10485760,
      tags: ['team', 'meeting', 'video'],
      uploadedBy: 'admin',
      createdAt: '2024-03-19T15:30:00Z',
      updatedAt: '2024-03-19T15:30:00Z',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const formatFileSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'da-DK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <PhotoIcon className="h-8 w-8 text-blue-500" />;
    } else if (type.startsWith('video/')) {
      return <VideoCameraIcon className="h-8 w-8 text-red-500" />;
    } else {
      return <DocumentIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Media Library</h1>
        <button className="btn btn-primary">Upload Files</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaFiles.map(file => (
          <div key={file.id} className="card bg-base-100 shadow-xl">
            <figure className="px-4 pt-4">
              <img
                src={file.thumbnailUrl}
                alt={file.name}
                className="rounded-xl h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{file.name}</h2>
              <div className="text-sm space-y-1">
                <p>Type: {file.type}</p>
                <p>Size: {formatFileSize(file.size)}</p>
                {file.dimensions && (
                  <p>Dimensions: {file.dimensions.width}x{file.dimensions.height}</p>
                )}
                <p>Uploaded: {formatDate(file.createdAt)}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {file.tags.map(tag => (
                    <span key={tag} className="badge badge-sm">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-ghost btn-sm">Edit</button>
                <button className="btn btn-ghost btn-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Media; 