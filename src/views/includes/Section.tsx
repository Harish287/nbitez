import React, { FC } from "react";
import SlideShow from "../../components/SlideShow";
import ProductCart, { ProductType } from "../../components/ProductCart";
import ProductSort from "../../components/ProductSort";
import ProductOfDay from "../../components/ProductOfDay";
import Blog from "../../components/Blog";
import Testimonial from "../../components/Testimonial";
import { CategoryType, blogInfo, testimonialInfo } from "../VirtualData";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-hooks";
import {
  useGetAllProductsQuery,
  useGetBestProductsQuery
} from "../../store/apiquery/productApiSlice";
import Spinner from "../../components/Spinner";
import { useGetAllCategoriesQuery } from "../../store/apiquery/categoryApiSlice";
import RoutePaths from "../../config";
import { useGetBlogQuery, useGetSliderOfferQuery } from "../../store/apiquery/productApiSlice";

// Define the category type
// interface CategoryType {
//   id: number;
//   title: string;
// }






interface CategoryProps {
  category: any;
  arrow?: "left" | "right"; // Restrict to only 'left' or 'right'
  categoryId: number | null; // Define categoryId as a number or null
  onClick: (id: number) => void; // Define onClick to accept a number ID
}

const Category: React.FC<CategoryProps> = ({
  category,
  arrow = "left",
  categoryId,
  onClick
}) => {
  return (
    <div key={category.id} className="category text-dark">
      {arrow === "left" && <i className="bi bi-chevron-double-right me-2"></i>}
      <Link to={""} className="text-dark" onClick={() => onClick(category.id)}>
        {category.title}
      </Link>
      {arrow === "right" && (
        <i className="bi bi-chevron-right float-end opacity-75 me-2"></i>
      )}
    </div>
  );
};

export default Category;

// const AllCategory = () => {

//   const { isLoading, data: categoryList, isError } = useGetAllCategoriesQuery("api/categories");

//   return <div className="all-category col-3 d-none d-xl-block shadow border-1 border-light p-0">
//     <h6 className="fd-bg-primary p-3 fw-bold rounded-top-3">ALL CATEGORIES</h6>
//     {!isLoading && !isError ?
//       <div className="category-list d-flex flex-column gap-4 py-2 px-3">
//         {
//           categoryList['data'].map((category: CategoryType) => <Category category={category} arrow='right' key={category.id} />)
//         }
//       </div> :
//       <Spinner />
//     }
//   </div>
// }

const About: FC = () => {
  return (
    <div
      className="section-info p-2 py-4 rounded-3 my-5 border-2 border-color-light shadow text-black"
      style={{ minHeight: "100px" }}
    >
      <div className="container-fluid">
        <div className="row ">
          <div className="col-12 col-lg-3 py-3 py-lg-0 d-flex gap-2">
            <div className="w-25 text-center align-self-center">
              <i className="bi bi-bus-front fa-2x bg-"></i>
            </div>
            <div>
              <h6 className="fw-bold">Free Shipping</h6>
              <span className="font-light opacity-75">
                Free UK shipping when you spend ₹30.
              </span>
            </div>
          </div>
          <div className="col-12 col-lg-3 py-3 py-lg-0 d-flex gap-2">
            <div className="w-25 text-center align-self-center">
              <i className="bi bi-flower2 fa-2x bg-"></i>
            </div>
            <div>
              <h6 className="fw-bold">Get Fresh Products</h6>
              <span className="font-light opacity-75">
                Find a range of best online organic food.
              </span>
            </div>
          </div>
          <div className="col-12 col-lg-3 py-3 py-lg-0 d-flex gap-2">
            <div className="w-25 text-center align-self-center">
              <i className="bi bi-currency-rupee fa-2x bg-"></i>
            </div>
            <div>
              <h6 className="fw-bold">Moneyback Offer</h6>
              <span className="font-light opacity-75">
                Free UK shipping when you spend ₹30.
              </span>
            </div>
          </div>
          <div className="col-12 col-lg-3 py-3 py-lg-0 d-flex gap-2">
            <div className="w-25 text-center align-self-center">
              <i className="bi bi-shield-x fa-2x bg-"></i>
            </div>
            <div>
              <h6 className="fw-bold">Safe Payment</h6>
              <span className="font-light opacity-75">
                We are using secure payment methods.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Promotion: FC = () => {

  const { data, error, isLoading } = useGetSliderOfferQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading slider offer</div>;
  }

  const offers = data?.data;


  return (
    <div>
       <h4 className=" text-black">Special Offeres </h4>
      <div
        className="section-promotion container my-5"
        style={{ minHeight: "170px" }}
      >
       
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
          {offers && offers.length > 0 ? (
            offers.map((offer: { id: React.Key | null | undefined; image: string | undefined; text: string | undefined; }) => (
              <div key={offer.id} className="col">
                <div className="">
                  <div className="card-body">
                    {/* <h5 className="card-title text-bg-danger text-center">Special Offer</h5> */}
                    <div className="offer-image mb-3">
                      <img
                        src={offer.image}
                        alt={offer.text}
                        className="img-fluid rounded-3 w-100"
                      />
                    </div>
                    {/* <p className="card-text">{offer.text}</p> */}
                    <p className="text-muted">
                      {/* <strong>Valid Dates:</strong> {offer.dates} */}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col">
              <p>No offers available at the moment.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

const Promotion2 = () => {
  return (
    <div
      className="promotion-2 position-relative d-none d-lg-block my-5"
      style={{ height: "450px" }}
    >
      <div className="position-relative promotion-2-image h-100">
        <span
          className="position-absolute top-0 end-0 start-0 bottom-0 rounded-4"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        ></span>
        <img
          src="/img/banner.jpg"
          alt="banner promo"
          className="w-100 h-100 rounded-4"
        />
      </div>
      <div
        className="promotion-text position-absolute col-5"
        style={{ top: "25%", right: "2%" }}
      >
        <h2>SUMMER SALE</h2>
        <h1 className="fw-bold">
          <span className="fd-color-primary">39%</span> OFF
        </h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab explicabo
          voluptatem iste, sequi qua.
        </p>
        <Link
          to={RoutePaths.shop}
          className="fd-btn w-50 rounded-5 text-center"
        >
          Shop now <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

const Promotion3 = () => {
  return (
    <div className="promotion-3 position-relative shadow">
      <div className="position-relative promotion-2-image h-100">
        <span
          className="position-absolute top-0 end-0 start-0 bottom-0"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        ></span>
        <img
          src="/img/banner2.jpg"
          alt="banner promo"
          className="w-100 h-100"
        />
      </div>
      <div
        className="promotion-text position-absolute w-100 p-2"
        style={{ top: "5%" }}
      >
        <h4>85% Hat Free</h4>
        <h3>Low-Fat Meet</h3>
        <h4 className="fw-bold my-3">
          Started at <span className="fd-color-primary">₹79.99</span>
        </h4>
        <Link
          to={RoutePaths.shop}
          className="fd-btn w-75 rounded-5 text-center"
        >
          Shop now <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

const PopularProducts = ({
  grid = 3,
  type = "grid",
  categoryId
}: {
  grid?: number | boolean;
  type?: string;
  categoryId?: number | null;
}) => {
  const {
    isLoading,
    data: productsList,
    isSuccess,
    isError
  } = useGetAllProductsQuery("api/product");

  // const productsList : ProductType[] = useAppSelector((state) => state.products);
  // console.log("productsList", productsList, "isSuccess", isSuccess);
  // let content: React.ReactNode;

  // content =
  //   isLoading || isError ? (
  //     <Spinner />
  //   ) : isSuccess ? (
  //     productsList["data"].map((product: ProductType) => (
  //       <ProductCart {...product} type={type} key={product.id} />
  //     ))
  //   ) : null;

  // let content: React.ReactNode;

  const content = isLoading ? (
    <Spinner />
  ) : isError ? (
    <div>Error loading products. Please try again later.</div>
  ) : productsList?.data?.length ? (
    // If a category is selected, filter products by categoryId. Otherwise, show all products.
    productsList.data
      .filter((product: any) => categoryId ? product.categorie_id === categoryId : true)
      .map((product: ProductType) => (
        <ProductCart {...product} type={type} key={product.id} />
      ))
  ) : (
    // Show all products when no products are filtered (categoryId is null).
    productsList.data.map((product: ProductType) => (
      <ProductCart {...product} type={type} key={product.id} />
    ))
  );

  // console.log  ("dsada", productsList['data'].filter((e: any) => e["categorie_id "] == categoryId))
  return (
    <div
      className={
        type === "list" ? "test" : "d-grid gap-3 grid-0 grid-lg-" + grid
      }
    >
      {content}
    </div>
  );
};

const SortProducts = () => {
  const { data: products, isLoading, isError } = useGetBestProductsQuery("");

  return (
    <>
      {!isLoading && !isError ? (
        <div>
          {products.data.map((product: { products: ProductType }) => (
            <ProductSort {...product.products} key={product.products.id} />
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

// const SortProducts1  = () => {

//   const { data: products, isLoading, isError } = useGetBestProductsQuery('');

//   return (<>
//     {
//       !isLoading && !isError ?
//         <div>
//           {
//             products.data.map((product: { products: ProductType }) => <ProductSort {...product.products} key={product.products.id} />)
//           }
//         </div>
//         :
//         <Spinner />
//     }
//   </>
//   );
// }

const BlogAndNews = ({ grid = 3 }: { grid?: number }) => {

  const { data, error, isLoading } = useGetBlogQuery({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching blogs!</div>;
  }

  console.log("aaa", data.data);

  return (
    <div
    // className={
    //   "d-grid gap-3 grid-0 grid-lg-" +
    //   grid +
    //   " mb-0 mb-lg-2 justify-content-space-between gap-3"
    // }
    >
      <ul className={
        "d-grid gap-3 grid-0 grid-lg-" +
        grid +
        " mb-0 mb-lg-2 justify-content-space-between gap-3"
      }>
        {data?.data.map((blog: {
          [x: string]: string | undefined; id: string; title: string; content: string
        }) => (
          <li key={blog.id} className="bg-white">
            <img src={blog.img} alt={blog.title} className='w-100 h-75 cover ' />
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className="d-grid grid-lg-2 grid-0 gap-3 my-5">
      {testimonialInfo.map((testimonial) => (
        <Testimonial {...testimonial} key={testimonial.authorName} />
      ))}
    </div>
  );
};

const MakeCall = () => {
  return (
    <div
      className="make-call d-flex flex-wrap fw-bold justify-content-between fd-bg-primary w-100 py-4 px-2 px-lg-5 my-5"
      style={{ minHeight: "60px" }}
    >
      <h3>Get A Free Service Or Make A Call</h3>
      <div className="align-self-center mt-3 mt-lg-0">
        <a href="#" className="bg-white fd-color-primary py-3 px-4">
          <i className="bi bi-phone me-1"></i>MAKE A CALL
        </a>
      </div>
    </div>
  );
};

const Section = () => {
  return (
    <section>
      <div className="container-fluid">
        <div className="row px-3 px-lg-5 py-4 my-5 justify-content-between">
          {/* <AllCategory /> */}
          <div className=" p-0 h-100">
            <SlideShow />
          </div>
        </div>

        <div className="popular-products text-black my-5">
          <div className="d-flex flex-wrap justify-content-between ">
            <h4>Popular Products</h4>
            <div>
              <Link to={RoutePaths.shop} className="fd-btn fw-bold">
                View All <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
          <PopularProducts grid={4} />
        </div>

        <div className="px-3  py-4 mb-5">
          <About />
          <Promotion />

          <div
            className="day-deals-rated row justify-content-between text-black mt-5"
            style={{ minHeight: "400px" }}
          >
            <div className="day-deals col-12 col-lg-8 bg-white p-3 mb-2 mb-lg-0 border-1 border">
              <div className="d-flex justify-content-between border-bottom-2">
                <h5>Deals Hot Of The Day</h5>
                <div className="deals-direction d-flex gap-2">
                  {/* <a href="" className="text-dark">
                    <i className="bi bi-arrow-left"></i>
                  </a>
                  <a href="" className="text-dark">
                    <i className="bi bi-arrow-right"></i>
                  </a> */}
                </div>
              </div>
              <hr />
              <div>
                <ProductOfDay />
              </div>
            </div>
            <div className="top-rated bg-white col-12 col-lg-3 border-1 border fd-hover-border-primary p-3">
              <h5>Top Rated Products</h5>
              <hr />
              <SortProducts />
            </div>
          </div>
          <Promotion2 />
          <div
            className="product-types d-grid grid-lg-4 grid-0 gap-3 my-5"
            style={{ minHeight: "300px" }}
          >
            <div className="top-rated text-black bg-white border-1 border fd-hover-border-primary p-3">
              <h5>Hot Deals</h5>
              <hr />
              <SortProducts />
            </div>
            <div className="top-rated text-black bg-white border-1 border fd-hover-border-primary p-3">
              <h5>Top Rated Products</h5>
              <hr />
              <SortProducts />
            </div>
            <div className="top-rated text-black bg-white border-1 border fd-hover-border-primary p-3">
              <h5>Best Seller</h5>
              <hr />
              <SortProducts />
            </div>
            <Promotion3 />
          </div>
          <div className="featured-products text-black my-5">
            <div className="d-flex justify-content-between mb-5">
              <h4>Featured Products</h4>
              <div>
                <Link to={RoutePaths.shop} className="fd-btn fw-bold">
                  View All <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
            <PopularProducts grid={4} />
          </div>
        </div>
        <MakeCall />
        <div className="blog-news text-black px-3 px-lg-5 my-5">
          <div className="d-flex flex-wrap justify-content-between mb-5">
            <h4>Latest Blog & News</h4>
            <div>
              <a href="blog" className="fd-btn fw-bold">
                View All <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
          <BlogAndNews />
        </div>
        <div className="testimonials text-black px-3 px-lg-5 my-5">
          <div className="d-flex flex-wrap justify-content-between">
            <h4>Our Awesome Testimonial</h4>
            <div>
              <a href="teams" className="fd-btn fw-bold">
                View All <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
          {/* <Testimonials /> */}
        </div>
      </div>
    </section>
  );
};

export {
  Section,
  BlogAndNews,
  PopularProducts,
  SortProducts,
  //  AllCategory,
  Category
};
