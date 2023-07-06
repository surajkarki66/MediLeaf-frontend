/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { BeatLoader } from 'react-spinners';

import { PlantImageType, PlantType } from '@/@types';
import { useToast } from '@/components/ui/use-toast';
import { getPlantDetails } from '@/hooks/api';

const DetailsPage: React.FC = () => {
  const [plant, setPlant] = useState<PlantType>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const { id } = router.query;

  let resourceLinksLength = 0;
  if (plant) {
    resourceLinksLength = plant.other_resources_links.length;
  }

  useEffect(() => {
    if (id) {
      getPlantDetails(Number(id))
        .then((data) => {
          setLoading(false);
          setPlant(data);
        })
        .catch((_error) => {
          setLoading(false);
          toast({
            title: `Oops! Something went wrong`,

            variant: 'destructive',
            duration: 3000,
          });
        });
    }
  }, [id, toast]);
  return (
    <div className='my-10'>
      {loading ? (
        <div className='flex justify-center items-center min-h-[70vh]'>
          <BeatLoader
            color='#1E9C5D'
            loading={loading}
            size={35}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        </div>
      ) : (
        <div>
          <h1 className='flex flex-col sm:flex-row justify-between mx-[28px] md:mx-[50px] lg:mx-[90px] xl:mx-[110px] 2xl:mx-[340px]  mb-1'>
            <span className='text-[1.8rem] mb-2 sm:mb-0 sm:mr-4'>
              <i>
                {plant?.genus} {plant?.species}
              </i>{' '}
              L.
            </span>
          </h1>
          <div className='flex flex-col sm:flex-row mx-[28px] md:mx-[50px] lg:mx-[90px] xl:mx-[110px] 2xl:mx-[340px]'>
            <span className='text-[1.2rem] mb-2 sm:mb-0 sm:mr-4 text-gray-700'>
              {plant?.common_names?.map((name: string, index: number) => (
                <React.Fragment key={index}>
                  {index > 0 && ', '}
                  {name}
                </React.Fragment>
              ))}
            </span>
          </div>
          <div className='flex flex-wrap mx-[28px] md:mx-[50px] lg:mx-[90px] xl:mx-[110px] 2xl:mx-[340px]'>
            {plant?.images?.map((image: PlantImageType) => (
              <div
                className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4'
                key={image.id}
              >
                <a
                  key={image.id}
                  className='cursor-pointer'
                  href={image?.image}
                  target='_blank'
                  rel='noreferrer'
                >
                  <Image
                    src={image?.image}
                    alt={image?.part}
                    className='w-[210px] h-[150px] mt-4 p-2 border border-gray-300 rounded-lg'
                    width={200}
                    height={150}
                  />
                </a>
              </div>
            ))}
          </div>

          <div className='flex flex-wrap mx-[28px] md:mx-[50px] lg:mx-[90px] xl:mx-[110px] 2xl:mx-[340px] mt-4'>
            <div className='w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mb-4'>
              <div className='shadow-md rounded-md bg-white'>
                <div className='border-b border-gray-200 border-solid'>
                  <h2 className='text-lg font-bold mb-1 px-4 py-2 ml-2'>
                    Description
                  </h2>
                </div>

                <div
                  className='text-justify px-6 py-4 text-md'
                  dangerouslySetInnerHTML={{
                    __html: plant ? plant.description : '',
                  }}
                />

                <div className='border-y border-gray-200 border-solid'>
                  <h2 className='text-lg font-bold mb-1 px-4 py-2 ml-2'>
                    Medicinal Properties
                  </h2>
                </div>
                <div
                  className='text-justify px-6 py-4 text-md'
                  dangerouslySetInnerHTML={{
                    __html: plant ? plant.medicinal_properties : '',
                  }}
                />
              </div>
            </div>
            <div className='flex flex-wrap w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mb-4'>
              <div className='w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 px-2 mb-4'>
                <div className='shadow-md rounded-md bg-white flex '>
                  <div className='w-full'>
                    <div className='border-b border-gray-200 border-solid'>
                      <h2 className='text-lg font-bold mb-1 px-4 py-2 ml-2'>
                        General Info.
                      </h2>
                    </div>

                    <div className='px-6 py-4 pb-2 text-md'>
                      <div className='mb-[10px] break-all'>
                        <label className='font-medium'>Common name(s) </label>
                        <br />
                        {plant?.common_names?.map(
                          (
                            name: string,
                            index: React.Key | null | undefined
                          ) => (
                            <h6
                              key={index}
                              className='text-md text-[#1E9C5D] ml-3'
                            >
                              {name}
                            </h6>
                          )
                        )}
                      </div>
                      <div className='border-b border-gray-200  w-full'></div>
                      <div className='mb-[10px] mt-[10px] break-all'>
                        <label className='font-medium'>Family </label>
                        <br />
                        <h6 className='text-md text-[#1E9C5D] ml-3'>
                          {plant?.family}
                        </h6>
                      </div>
                      <div className='border-b border-gray-200  w-full'></div>
                      <div className='mb-[10px] mt-[10px] break-all'>
                        <label className='font-medium'>Genus </label>
                        <br />
                        <span className='text-md text-[#1E9C5D] ml-3'>
                          {plant?.genus}
                        </span>
                      </div>
                      {plant?.species && (
                        <>
                          {' '}
                          <div className='border-b border-gray-200  w-full'></div>
                          <div className='mb-[10px] mt-[10px] break-all'>
                            <label className='font-medium'>Species </label>
                            <br />
                            <span className='text-md text-[#1E9C5D] ml-3'>
                              {plant?.species}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 px-2 mb-4'>
                <div className='shadow-md rounded-md bg-white flex '>
                  <div className='w-full'>
                    <div className='border-b border-gray-200 border-solid'>
                      <h2 className='text-lg font-bold mb-1 px-4 py-2 ml-2'>
                        Additional
                      </h2>
                    </div>
                    <div className='px-6 py-4 pb-2 text-md'>
                      <div className='mb-[10px] break-all'>
                        <label className='font-medium'>Duration </label>
                        <br />
                        <span className='text-md text-[#1E9C5D] capitalize ml-3 block'>
                          {plant?.duration}
                        </span>
                      </div>
                      <div className='border-b border-gray-200  w-full'></div>
                      <div className='mb-[10px] mt-[10px] break-all'>
                        <label className='font-medium'>Growth Habit </label>
                        <br />
                        <span className='text-md text-[#1E9C5D] capitalize ml-3'>
                          {plant?.growth_habit}
                        </span>
                      </div>
                      <div className='border-b border-gray-200  w-full'></div>
                      <div className='mb-[10px] mt-[10px] break-all'>
                        <label className='font-medium'>Wikipedia </label>
                        <br />
                        <a
                          href={plant?.wikipedia_link}
                          className='text-md text-[#1E9C5D]  ml-3'
                          target='_blank'
                          rel='noreferrer'
                        >
                          {plant?.wikipedia_link}
                        </a>
                      </div>
                      {resourceLinksLength > 0 && (
                        <>
                          {' '}
                          <div className='border-b border-gray-200  w-full'></div>
                          <div className='mb-[10px] mt-[10px] break-all'>
                            <label className='font-medium'>Other links</label>
                            <br />
                            {plant?.other_resources_links?.map(
                              (
                                link: string,
                                index: React.Key | null | undefined
                              ) => (
                                <a
                                  href={link}
                                  key={index}
                                  className='text-md text-[#1E9C5D] block  ml-3 md:text-base'
                                  target='_blank'
                                  rel='noreferrer'
                                >
                                  {link}
                                </a>
                              )
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DetailsPage;
