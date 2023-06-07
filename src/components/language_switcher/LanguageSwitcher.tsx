import { FC, Fragment, useState } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const LanguageSwitcher: FC<{ small: boolean }> = ({ small }) => {
  const [lang, setLang] = useState('ENG');
  return (
    <Menu as='div' className='ml-1'>
      <div>
        <Menu.Button
          className={`flex items-center py-2.5 px-0 -mx-3 block rounded-lg px-3 text-base font-semibold leading-6 text-gray-900 ${
            small ? 'ml-0' : 'ml-4'
          }`}
        >
          {lang === 'ENG' ? (
            <i className='flag-icon flag-icon-us mr-1'></i>
          ) : (
            <i className='flag-icon flag-icon-np'></i>
          )}

          {lang}
          <ChevronDownIcon
            className='ml-1 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100'
            aria-hidden='true'
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items
          className={`absolute  mt-2 w-56 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
            small ? 'left-0' : 'right-0'
          }`}
        >
          <div className='px-1 py-1 '>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    setLang('ENG');
                  }}
                  className={`${
                    active ? 'bg-[#1E9C5D] text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <i className='flag-icon flag-icon-us'></i>
                  &nbsp;&nbsp;ENG
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    setLang('NEP');
                  }}
                  className={`${
                    active ? 'bg-[#1E9C5D] text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <i className='flag-icon flag-icon-np'></i>
                  &nbsp;&nbsp;NEP
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LanguageSwitcher;
