import React from 'react';

import { ChevronDownIcon } from '@heroicons/react/24/outline';

import { plantsPredictionList } from '@/assets/dummy_data';
import ImageUploader from '@/components/image_uploader/ImageUploader';
import PlantCard from '@/components/plant/PlantCard';

export default function Identification() {
  return (
    <div className='my-10'>
      <h1 className='flex flex-col sm:flex-row justify-between items-center mx-[20px] md:mx-[50px] lg:mx-[90px] xl:mx-[110px] 2xl:mx-[340px]  mb-5'>
        <span className='text-[1.8rem] font-medium mb-2 sm:mb-0 sm:mr-4 '>
          Medicinal plants
        </span>
        <span className='text-[1.5rem]  text-gray-600'>Identify</span>
      </h1>
      <div className='bg-gray-100 sm:mx-[20px] md:mx-[50px]  mx-[20px] lg:mx-[90px] xl:mx-[110px] 2xl:mx-[340px] rounded-lg'>
        <h1 className=' px-7 pt-5 pb-3 text-2xl font-medium'>Query</h1>
        <p className='px-7 font-medium'>
          Identify Plant & It&apos;s Medicinal Properties / Contribute to
          MediLeaf
        </p>
        <p className='px-7 pt-1 font-light'>
          It is recommended to use images with better resolution and only have
          leaves. (<i>less than 3 MB</i>)
        </p>
        <ImageUploader multiple={false} />
      </div>
      <h1 className='flex flex-row sm:flex-row justify-between items-center mx-[20px] md:mx-[50px] lg:mx-[90px] xl:mx-[110px] 2xl:mx-[340px] my-5'>
        <span className='text-[1.8rem] font-medium mb-2 sm:mb-0 sm:mr-4 '>
          Results <ChevronDownIcon className='w-7 h-7 inline' />
        </span>
      </h1>

      <div className='grid grid-cols-1 gap-6 sm:mx-[20px] md:mx-[50px]  mx-[20px] lg:mx-[90px] xl:mx-[110px] 2xl:mx-[340px] rounded-lg'>
        {plantsPredictionList.map((plant, index) => {
          return (
            <React.Fragment key={index}>
              <PlantCard
                scientificName={plant.scientificName}
                commonNames={plant.commonNames}
                familyName={plant.familyName}
                images={plant.images}
                confidence={80}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
