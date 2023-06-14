/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

import { ChevronDownIcon } from '@heroicons/react/24/outline';

import ImageUploader from '@/components/image_uploader/ImageUploader';
import PlantCard from '@/components/plant/PlantCard';
import Loading from '@/components/ui/loading';
import { useToast } from '@/components/ui/use-toast';
import { predict, getPredictionPlants } from '@/hooks/api';

export default function Identification() {
  const [loading, setLoading] = useState(false);
  const [mappedSpecies, setMappedSpecies] = useState<any[]>([]);
  const [selectedImages, setSelectedImages] = useState<Blob[]>([]);
  const { toast } = useToast();

  const getPrediction = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setLoading(true);
    e.preventDefault();
    if (selectedImages.length > 0) {
      try {
        const data = await predict({
          image_file: selectedImages[0],
        });
        const queryStr = data
          .map((item: any) => {
            const [genus, species] = item.scientific_name.split(' ', 2);
            if (species) {
              return `genus=${genus}&species=${species}`;
            }
            return `genus=${genus}`;
          })
          .join('&');

        const { results } = await getPredictionPlants(`?${queryStr}`);
        const r = results.map((result: any) => {
          let scientificName = `${result.genus}`;
          if (result.species) {
            scientificName = `${result.genus} ${result.species}`;
          }

          const matchingData = data.find(
            (item: any) => item.scientific_name === scientificName
          );

          if (matchingData) {
            return { ...result, probability: matchingData.probability };
          }
          return result;
        });
        const sortedResults = r
          .slice()
          .sort(
            (a: { probability: number }, b: { probability: number }) =>
              b.probability - a.probability
          );

        setMappedSpecies(sortedResults);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast({
        title: `Oops! Image not found`,
        description: `Please first upload an image to get the result.`,
        variant: 'destructive',
        duration: 4000,
      });
    }
  };

  const resultedPlants = () => {
    return (
      // eslint-disable-next-line react/jsx-no-comment-textnodes
      <>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loading />
          </div>
        ) : mappedSpecies?.length > 0 ? (
          <h1 className='flex flex-row sm:flex-row justify-between items-center mx-[20px] md:mx-[50px] lg:mx-[90px] xl:mx-[110px] 2xl:mx-[340px] my-5'>
            <span className='text-[1.8rem] font-medium mb-2 sm:mb-0 sm:mr-4 '>
              Results <ChevronDownIcon className='w-7 h-7 inline' />
            </span>
          </h1>
        ) : null}
        <div className='grid grid-cols-1 gap-6 sm:mx-[20px] md:mx-[50px]  mx-[20px] lg:mx-[90px] xl:mx-[110px] 2xl:mx-[340px] rounded-lg'>
          {mappedSpecies?.map((plant, index) => {
            return (
              <React.Fragment key={index}>
                <PlantCard
                  scientificName={`${plant.genus} ${
                    plant.species ? plant.species : ''
                  }`}
                  commonNames={plant.common_names}
                  familyName={plant.family}
                  images={plant.images}
                  confidence={Math.round(plant.probability * 100)}
                />
              </React.Fragment>
            );
          })}
        </div>
      </>
    );
  };

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
        <ImageUploader
          multiple={false}
          getPrediction={getPrediction}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />
      </div>
      {resultedPlants()}
    </div>
  );
}
