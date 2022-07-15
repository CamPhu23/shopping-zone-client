import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronRightIcon, FilterIcon } from '@heroicons/react/solid'
import _ from 'lodash'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Filter } from '../../../components/filter/filter'
import { Paging } from '../../../components/paging/paging'
import { ProducList } from '../../../components/product/product-list'
import { Search } from '../../../components/search/search'
import { Sort } from '../../../components/sort/sort'
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE
} from '../../../constants/default-axios-product'
import { productService } from '../../../services/modules'

const intialSortOptions = [
  { name: 'Tên: A đến Z', value: 'name-asc', current: true },
  { name: 'Tên: Z đến A', value: 'name-desc', current: false },
  { name: 'Giá: Thấp tới cao', value: 'price-asc', current: false },
  { name: 'Giá: Cao tới Thấp', value: 'price-desc', current: false },
]

const intialSubCategories = [
  { name: 'Áo thun nam', value: 'ao-thun-nam', current: false },
  { name: 'Áo thun nữ', value: 'ao-thun-nu', current: false },
  { name: 'Áo sơ mi nam', value: 'ao-so-mi-nam', current: false },
  { name: 'Áo sơ mi nữ', value: 'ao-so-mi-nu', current: false },
  { name: 'Áo khoác nam', value: 'ao-khoac-nam', current: false },
  { name: 'Áo khoác nữ', value: 'ao-khoac-nu', current: false },
]

const filters = [
  {
    id: 'color',
    name: 'Màu sắc',
    options: [
      { value: 'trang', label: 'Trắng', checked: false },
      { value: 'den', label: 'Đen', checked: false },
      { value: 'xanh', label: 'Xanh', checked: false },
      { value: 'xam', label: 'Xám', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 'S', label: 'S', checked: false },
      { value: 'M', label: 'M', checked: false },
      { value: 'L', label: 'L', checked: false },
      { value: 'XL', label: 'XL', checked: false },
      { value: 'XXL', label: 'XXL', checked: false },
    ],
  },
  {
    id: 'feature',
    name: 'Dịch vụ & Khuyến mãi',
    options: [
      { value: 'san-pham-moi', label: 'Sản phẩm mới', checked: false },
      { value: 'san-pham-khuyen-mai', label: 'Sản phẩm khuyến mãi', checked: false },
      { value: 'san-pham-ban-chay', label: 'Sản phẩm bán chạy', checked: false },
    ],
  },
]

const initialProducts = {
  products: [],
  info: {
    currentIndex: DEFAULT_PAGE,
    numberOfIndex: DEFAULT_PAGE_SIZE,
    total: 0,
    page: 1
  }
}

let parameters = [
  { name: 'p', value: DEFAULT_PAGE },
  { name: 's', value: DEFAULT_PAGE_SIZE },
  { name: 'category', value: [] },
  { name: 'color', value: [] },
  { name: 'size', value: [] },
  { name: 'feature', value: [] },
  { name: 'search', value: "" },
  { name: 'sort', value: "" },
];

export default function ProductPage() {
  const { state } = useLocation();
  // @ts-ignore
  let filter = null;
  if (state) {
    filter = state.filter;
  }

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const page = useRef(null);

  // sort and product state
  const [sortOptions, setSortOptions] = useState(intialSortOptions);
  const [products, setProducts] = useState(initialProducts);
  const [subCategories, setSubCategories] = useState(intialSubCategories);

  // Subcategory funtions 
  const changeSubCategories = (sub) => {
    const newSubCategories = [...subCategories];

    subCategories.forEach(o => {
      o.value === sub ? o.current = true : o.current = false;
    })

    setSubCategories(newSubCategories);
  }

  // Filter functions
  // add parameter to a string and call api
  const handleProduct = () => {
    let apiProduct = "";

    apiProduct += parameters[0].name + '=' + parameters[0].value;
    parameters.slice(1).map(p => {
      !_.isEmpty(p.value) ? apiProduct += '&' + p.name + '=' + p.value.toString() : apiProduct = apiProduct;
    })

    productService
      .getAllProduct(apiProduct)
      .then((data) => {
        setProducts(data);

        // reset the current page to 1 after filtering
        page.current.changeCurrentPage({ indexPage: parseInt(parameters[0].value) });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  // add filter to parameters array
  const handleAddParameter = (name, value) => {
    var parameter = parameters.find(x => x.name == name);

    if (name !== 'p' && name !== 's' && name !== 'category' && name !== 'search' && name !== 'sort') {
      parameters.find(x => x.name == 'p').value = '1';
      if (!_.isEmpty(parameter) && !parameter.value.includes(value)) parameter.value.push(value);
    } else {
      parameter.value = value;

      if (name !== 'p') parameters.find(x => x.name == 'p').value = '1';

      if (name === 'category') changeSubCategories(value);
    }

    handleProduct();
  }

  // remove filter out of parameters array
  const handleRemoveParameter = (name, value) => {
    var parameter = parameters.find(x => x.name == name);

    if (parameter.value.includes(value)) {
      parameters.find(x => x.name == 'p').value = '1';
      parameter.value = parameter.value.filter(item => value != item);
    }

    handleProduct();
  }

  // call the first time render to fetch product from api
  useEffect(() => {
    if (filter) {
      // set new filter
      var sub = [...subCategories];
      var index = sub.findIndex(x => x.value == filter.value);
      sub[index] = filter;

      setSubCategories(sub);
      handleAddParameter("category", filter.value)
    }
    else {
      handleProduct();
    }
  }, [])

  // Sort functions
  // the func used to sort an array (in this case is product array)
  const sortFunction = (property) => {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  const changeOption = (option) => {
    const newOptions = [...sortOptions];

    newOptions.forEach(o => {
      o.value === option ? o.current = true : o.current = false;
    })

    setSortOptions(newOptions);
  }

  // handle sort order by...
  const handleSort = (option) => {
    let productsList = products.products;

    // change the checked in sortOptions
    changeOption(option);

    switch (option) {
      case 'name-asc':
        handleAddParameter("sort", "name_asc");
        break
      case 'name-desc':
        handleAddParameter("sort", "name_desc");
        break
      case 'price-asc':
        handleAddParameter("sort", "price_asc");
        break
      case 'price-desc':
        handleAddParameter("sort", "price_desc");
        break
    }

    setProducts({
      ...products,
      products: productsList
    })
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="z-50 fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Bộ lọc</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <div className="mt-4 border-t border-gray-200 pt-3">

                  <Search handleSearch={handleAddParameter} ></Search>
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="font-medium text-gray-900 px-2 py-3">
                    {subCategories.map((category) => (
                      <div key={category.name} className="block px-1 py-3">
                        <button
                          className={(category.current ? "font-medium" : "")}
                          category={category.value}
                          onClick={(e) => handleAddParameter('category', e.target.getAttribute('category'))}>
                          {category.name}
                        </button>
                      </div>
                    ))}
                  </ul>

                  {/* FILTER MOBILE */}
                  {filters && filters.map((section) => (
                    <Filter section={section} key={section.id}
                      handleAddFilter={handleAddParameter}
                      handleRemoveFilter={handleRemoveParameter} />
                  ))}
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-10 pb-6 border-b border-gray-200">
            <div className='flex space-x-3 items-center'>
              <button
                onClick={() => {
                  handleAddParameter('category', '');
                }}
              >
                <h1 className="text-xl font-bold tracking-tight text-gray-900">Tất cả sản phẩm</h1>
              </button>

              {subCategories.map((category) => (
                category.current === true &&
                (<div className='flex space-x-3 items-center hidden sm:flex' key={category.name}>
                  <ChevronRightIcon
                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5"
                    aria-hidden="true"
                  > </ChevronRightIcon>
                  <div>{category.name}</div>
                </div>)
              ))}
            </div>

            <div className="flex items-center">

              <Sort options={sortOptions} handleSort={handleSort}></Sort>

              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* Filters */}
              <div className="hidden lg:block">
                <Search handleSearch={handleAddParameter}></Search>

                <h3 className="sr-only">Categories</h3>
                <div role="list" className="mx-3 font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
                  {subCategories.map((category) => (
                    <div key={category.name}>
                      <button
                        className={category.current ? "font-medium" : ""}
                        category={category.value}
                        onClick={(e) => handleAddParameter('category', e.target.getAttribute('category'))}>
                        {category.name}
                      </button>
                    </div>
                  ))}
                </div>

                {/* FILTER */}
                {filters && filters.map((section) => (
                  <Filter section={section} key={section.id}
                    handleAddFilter={handleAddParameter}
                    handleRemoveFilter={handleRemoveParameter} />
                ))}
              </div>

              <div className="lg:col-span-3">

                {/* PRODUCT LIST (3 items each row) */}
                <ProducList products={products.products} columns={3}></ProducList>

                {/* PAGING (total product and 9 products each page) */}
                <Paging totalItem={products.info.total} numOfShowingPerPage={DEFAULT_PAGE_SIZE}
                  handleChangePage={handleAddParameter} ref={page} />

              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}