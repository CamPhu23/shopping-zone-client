import React from 'react'
import { Disclosure } from '@headlessui/react'
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid'

export const Filter = ({ 
  section,
  handleAddFilter,
  handleRemoveFilter
 }) => {
  const filterProduct = (filter, status) => {
    let name = filter.split('-')[0];
    let value;

    // feature value (i.e: ao-thun-moi) != another filters value
    name != 'feature' ? value = filter.split('-')[1] : value = filter.split('-').splice(1).join('-');

    if (status === 'add') {
      handleAddFilter(name, value);
    } else {
      handleRemoveFilter(name, value);
    }
  }

  return (
    <Disclosure as="div" className="border-b border-gray-200 py-6">
      {({ open }) => (
        <>
          <h3 className="mx-3 -my-3 flow-root">
            <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{section.name}</span>
              <span className="ml-6 flex items-center">
                {open ? (
                  <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="pt-6">
            <div className="space-y-4">
              {section.options.map((option, optionIdx) => (
                <div key={option.value} className="mx-3 flex items-center">
                  <input
                    id={`filter-${section.id}-${optionIdx}`}
                    name={`${section.id}[]`}
                    defaultValue={section.id + '-' + option.value}
                    type="checkbox"
                    defaultChecked={option.checked}
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                    onClick={(e) => {e.target.checked ? filterProduct(e.target.defaultValue, 'add') : filterProduct(e.target.defaultValue, 'remove') }}
                  />
                  <label
                    htmlFor={`filter-${section.id}-${optionIdx}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>

  )
}
