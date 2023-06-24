import React, { useState } from 'react';

import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDropzone } from 'react-dropzone';

import Blank from '@/assets/images/blank.png';
import { useToast } from '@/components/ui/use-toast';

type Props = {
  multiple: boolean;
  selectedImages: Blob[];
  setSelectedImages: React.Dispatch<React.SetStateAction<Blob[]>>;
  getPrediction: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
};

const ImageUploader: React.FC<Props> = ({
  multiple,
  selectedImages,
  setSelectedImages,
  getPrediction,
}) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const { toast } = useToast();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: multiple ? 5 : 1,
    onDrop: (acceptedFiles, fileRejections) => {
      if (acceptedFiles) {
        const uploadedImages = Array.from(acceptedFiles).map((file) =>
          URL.createObjectURL(file)
        );
        setSelectedImages(acceptedFiles);
        setPreviewImages(uploadedImages);
      }
      if (fileRejections) {
        fileRejections.forEach(({ errors }) => {
          toast({
            title: `${errors[0]?.message}`,
            description: `${
              errors[0]?.code === 'too-many-files'
                ? `Only single image is allowed to upload.`
                : `Only image files are allowed to upload.`
            }`,
            variant: 'destructive',
            duration: 3000,
          });
        });
      }
    },
  });

  const handleImagePreviewRemove = (index: number) => {
    const updatedImages = [...previewImages];
    const updatedSelectedImages = [...selectedImages];

    updatedImages.splice(index, 1);
    updatedSelectedImages.splice(index, 1);
    setPreviewImages(updatedImages);
    setSelectedImages(updatedSelectedImages);
  };

  const SingleImageView = () => {
    return (
      <div className='mt-14 flex flex-col justify-center items-center'>
        {previewImages.length > 0 ? (
          previewImages.map((image, index) => (
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
              className='w-[348px] h-[280px] rounded-lg'
              src={Blank}
              alt='blank'
            />
          </div>
        )}
        <button
          type='button'
          onClick={(e) => getPrediction(e)}
          className='bg-[#1E9C5D] px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 mt-5 mb-3'
        >
          <MagnifyingGlassCircleIcon className='w-7 h-7' />{' '}
        </button>
      </div>
    );
  };
  return (
    <div className='pt-10 px-5'>
      <input type='file' {...getInputProps()} />
      <div
        {...getRootProps({ className: 'dropzone' })}
        className='border-2 border-dashed border-gray-400 rounded-lg p-5 text-center cursor-pointer '
      >
        <label htmlFor='image-upload'>
          <span className='text-gray-600'>
            Drag and drop {multiple ? 'images' : 'image'} here or click here to
            upload.
          </span>
        </label>
      </div>
      {multiple ? null : <SingleImageView />}
    </div>
  );
};

export default ImageUploader;
