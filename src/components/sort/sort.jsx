import React, { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Sort = ({ options, handleSort }) => {

  const changeSorter = ({ option }) => {
    handleSort(option);
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="group inline-flex justify-center font-medium text-gray-700 hover:text-gray-900">
          Sắp xếp
          <ChevronDownIcon
            className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        // as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option) => (
              <Menu.Item key={option.name}>
                {({ active }) => (
                  <>
                    <input
                      hidden
                      id={`sort-${option.value}`}
                      defaultValue={option.value}
                      onClick={(e) => changeSorter({ option: e.target.defaultValue })}
                    >
                    </input>

                    <label
                      htmlFor={`sort-${option.value}`}
                      className={classNames(
                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                        'hover:bg-gray-100 hover:px-4 block px-3 py-2 w-full cursor-pointer'
                      )}
                    >
                      {option.name}
                    </label>
                  </>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
