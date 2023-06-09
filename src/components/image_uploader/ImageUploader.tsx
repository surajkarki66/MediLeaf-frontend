import React, { useState } from 'react';

import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

import Blank from '@/assets/images/blank.png';

const ImageUploader: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const uploadedImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages(uploadedImages);
    }
  };

  const handleImageDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    const droppedImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setSelectedImages((prevImages) => [...prevImages, ...droppedImages]);
  };

  const handleImagePreviewRemove = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  return (
    <div className='pt-10 px-5'>
      <input
        type='file'
        multiple
        onChange={handleImageUpload}
        className='hidden'
        id='image-upload'
      />
      <div
        className='border-2 border-dashed border-gray-400 rounded-lg p-5 text-center cursor-pointer '
        onDrop={handleImageDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <label htmlFor='image-upload'>
          <span className='text-gray-600'>
            Drag and drop images here or click to upload.
          </span>
        </label>
      </div>
      <div className='mt-14 flex flex-col justify-center items-center'>
        {selectedImages.length > 0 ? (
          selectedImages.map((image, index) => (
            <>
              <div key={index}>
                <img
                  src={image}
                  alt='Preview'
                  className='w-[348px] h-[270px] rounded-lg'
                />
              </div>
              <button
                onClick={() => handleImagePreviewRemove(index)}
                className='mt-0 text-red-600'
              >
                Remove
              </button>
            </>
          ))
        ) : (
          <div>
            <Image
              className='w-[348px] h-[270px] rounded-lg'
              src={Blank}
              alt='blank'
            />
          </div>
        )}
        <button className='bg-[#1E9C5D] px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 mt-5 mb-3'>
          <MagnifyingGlassCircleIcon className='w-7 h-7' />{' '}
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
