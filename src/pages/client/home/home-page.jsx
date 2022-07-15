// PRODUCT LIST
import { AnnotationIcon, CashIcon, CursorClickIcon, ReceiptRefundIcon } from '@heroicons/react/outline'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProducList } from '../../../components/product/product-list';
import { productService } from '../../../services/modules';

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
]

// Category Previews
const callouts = [
  {
    name: 'Áo thun nam',
    value: "ao-thun-nam",
    //description: 'Work from home accessories',
    imageSrc: 'https://res.cloudinary.com/dazdxrnam/image/upload/v1657820013/ShoppingZone/aothunnam_home_result_qukfwe.jpg',
    imageAlt: 'ao-thun-nam',
    href: '#',
  },
  {
    name: 'Áo thun nữ',
    value: "ao-thun-nu",
    //description: 'Journals and note-taking',
    imageSrc: 'https://res.cloudinary.com/dazdxrnam/image/upload/v1657820012/ShoppingZone/aothunnu_home_result_jo4rte.jpg',
    imageAlt: 'ao-thun-nu',
    href: '#',
  },
  {
    name: 'Áo khoác nam',
    value: "ao-khoac-nam",
    //description: 'Daily commute essentials',
    imageSrc: 'https://res.cloudinary.com/dazdxrnam/image/upload/v1657820012/ShoppingZone/aokhoacnam_home_result_q9luqu.jpg',
    imageAlt: 'ao-khoac-nam',
    href: '#',
  },
  {
    name: 'Áo khoác nữ',
    value: "ao-khoac-nu",
    //description: 'Daily commute essentials',
    imageSrc: 'https://res.cloudinary.com/dazdxrnam/image/upload/v1657820012/ShoppingZone/aokhoacnu_home_result_vu1iom.jpg',
    imageAlt: 'ao-khoac-nu',
    href: '#',
  },
  {
    name: 'Sơ mi nam',
    value: "ao-so-mi-nam",
    //description: 'Daily commute essentials',
    imageSrc: 'https://res.cloudinary.com/dazdxrnam/image/upload/v1657820014/ShoppingZone/sominam_home_result_wxbw7u.jpg',
    imageAlt: 'ao-so-mi-nam',
    href: '#',
  },
  {
    name: 'Sơ mi nữ',
    value: "ao-so-mi-nu",
    //description: 'Daily commute essentials',
    imageSrc: 'https://res.cloudinary.com/dazdxrnam/image/upload/v1657820014/ShoppingZone/sominu_home_result_imkgox.jpg',
    imageAlt: 'ao-so-mi-nu',
    href: '#',
  },
]

// Feature Sections
const features = [
  {
    name: 'Giá cả cạnh tranh',
    description:
      'Mang đến cho khách hàng những sản phẩm có giá tốt nhất.',
    icon: CashIcon,
  },
  {
    name: 'Miễn phí đổi trả sản phẩm',
    description:
      'Miễn phí đổi trả sản phẩm trong 60 ngày nếu có vấn đề với sản phẩm.',
    icon: ReceiptRefundIcon,
  },
  {
    name: 'Mua hàng dễ dành',
    description:
      'Chỉ với những cú click có thể dễ dàng chọn những sản phẩm yêu thích.',
    icon: CursorClickIcon,
  },
  {
    name: 'Tư vấn tận tình',
    description:
      'Đội ngũ nhân viên nhiệt tình hỗ trợ tư vấn cho khách hàng.',
    icon: AnnotationIcon,
  },
]


const HomePage = () => {
  const [newProduct, setNewProduct] = useState();
  const [bestSaleProduct, setBestSaleProduct] = useState();

  useEffect(() => {
    const newProductAPI = "feature=san-pham-moi&s=4";
    const bestSaleProducAPI = "feature=san-pham-ban-chay&s=4";

    productService
      .getAllProduct(newProductAPI)
      .then((data) => {
        setNewProduct(data.products);
      })
      .catch((err) => {
        throw new Error(err);
      });

    productService
      .getAllProduct(bestSaleProducAPI)
      .then((data) => {
        setBestSaleProduct(data.products);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, [])

  return (
    <>
      <div className="relative bg-white overflow-hidden">
        <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                Thời trang cho mọi người
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Trang phục không những phải đẹp, nó còn phải tạo nên phong cách của riêng bạn. Hãy cùng Shopping Zone
                chọn cho mình những bộ quần áo thật ưng ý nào.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                          <img
                            src="https://res.cloudinary.com/dazdxrnam/image/upload/v1657820013/ShoppingZone/home_1_result_ns5vtj.jpg"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="https://res.cloudinary.com/dazdxrnam/image/upload/v1657820013/ShoppingZone/home_2_result_qqzred.jpg"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="https://res.cloudinary.com/dazdxrnam/image/upload/v1657820013/ShoppingZone/home_3_result_zkpvgh.jpg"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="https://res.cloudinary.com/dazdxrnam/image/upload/v1657820013/ShoppingZone/home_4_result_qambnh.jpg"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="https://res.cloudinary.com/dazdxrnam/image/upload/v1657820013/ShoppingZone/home_5_result_lzga1t.jpg"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="https://res.cloudinary.com/dazdxrnam/image/upload/v1657820013/ShoppingZone/home_6_result_nj1yls.jpg"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="https://res.cloudinary.com/dazdxrnam/image/upload/v1657820013/ShoppingZone/home_7_result_v1vl86.jpg"
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to="/product"
                  className="inline-block text-center bg-teal-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-teal-700"
                >
                  Mua sắm ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Previews */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto pt-16 pb-0 sm:py-18 lg:pt-20 lg:pb-0 lg:max-w-none text-center">
            <h2 className="text-4xl font-extrabold text-gray-900">Dòng sản phẩm</h2>

            <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
              {callouts.map((callout) => (
                <div key={callout.name} className="group relative">
                  <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    <Link to={"/product"}
                      state={{
                        filter: { name: callout.name, value: callout.value, current: true },
                      }}>
                      <span className="absolute inset-0" />
                      {callout.name}
                    </Link>
                  </h3>
                  <p className="mb-6 text-base font-semibold text-gray-900">{callout.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT LIST */}
      <div className="bg-white">
        <div className="max-w-2xl mx-auto pt-10 pb-0 px-4 sm:py-18 lg:pt-10 lg:pb-0 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 text-center">Sản phẩm mới nhất</h2>
          {newProduct && <ProducList products={newProduct} columns={4}></ProducList>}
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-2xl mx-auto pt-10 pb-0 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:pt-10 lg:pb-0">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 text-center">Sản phẩm bán chạy</h2>
          {bestSaleProduct && <ProducList products={bestSaleProduct} columns={4}></ProducList>}
        </div>
      </div>

      {/* Feature Sections */}
      <div className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-10 lg:pb-0">
          <div className="lg:text-center">
            {/* <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">Transactions</h2> */}
            <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Điều khác biệt mang tên Shopping Zone
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Chọn sản phẩm mà bạn yêu thích, mọi thứ còn lại hãy để Shopping Zone lo!
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-teal-600 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Sections */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Đã sẵn sàng mua sắm?</span>
            <span className="block text-teal-600">Hãy tạo ngay tài khoản để mua sắm.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/sign-up"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
              >
                Tạo tài khoản
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
