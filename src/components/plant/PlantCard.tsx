import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/assets/images/logo.png';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type PlantCardProps = {
  scientificName: string;
  commonNames: string[];
  familyName: string;
  confidence: number;
  images: any[];
};

const PlantCard: React.FC<PlantCardProps> = ({
  scientificName,
  commonNames,
  familyName,
  confidence,
  images,
}) => {
  return (
    <div className='bg-white shadow-md rounded-lg px-6 '>
      <div className='pt-4 flex flex-col'>
        <Link href='#'>
          <h3 className='text-lg font-semibold italic text-[#1E9C5D] hover:underline'>
            {scientificName}
          </h3>
        </Link>

        <div className='flex flex-row justify-between items-center mb-4'>
          <p className='text-gray-800'>{commonNames[0]}</p>
          <p className='text-gray-600 italic'>{familyName}</p>
          <TooltipProvider delayDuration={50}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className='flex flex-row'>
                  <Image src={Logo} alt='confidence' className='w-6 h-5 mr-1' />
                  <p className='font-medium'> {confidence}%</p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Probability of being the right species: {confidence}%</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 border-t border-gray-300  mb-5 gap-6'>
        {images.map((image, index) => (
          <a
            key={index}
            className='cursor-pointer'
            href={image?.image}
            target='_blank'
            rel='noreferrer'
          >
            <Image
              src={image?.image}
              alt={image?.part}
              className='w-[210px] h-[150px] mt-4'
              width={200}
              height={150}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default PlantCard;
