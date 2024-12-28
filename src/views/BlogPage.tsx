import React from 'react'
import Footer from './includes/Footer';
import Header from './includes/Header';
import { apiCategory, blogInfo } from './VirtualData';
import { BlogAndNews, Category } from './includes/Section';
import Banner from '../components/Banner';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';
import Tags from '../components/Tags';
import Archives from '../components/Archives';
import { useGetBlogQuery } from "../store/apiquery/productApiSlice";

const BlogPage = () => {

  const { data, error, isLoading } = useGetBlogQuery({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching blogs!</div>;
  }

  console.log("aaa", data.data);


  return (
    <>
      <Header />
      <Banner page='News Feeds' path={['Home', 'News Feeds']} />
      <div className="container-fluid">
        <div className="shop row justify-content-between my-3 text-black p-3 p-lg-5">
          <div className="post-section col-12 col-lg-9">
            <BlogAndNews grid={2} />
          </div>
          <aside className='col-12 col-lg-3 mt-4 mt-lg-0'>
            <SearchBar />
            {/* <div className="category-list text-black bg-white w-100 border border-1 fd-hover-border-primary p-3 my-5"> */}
            {/* <h5>Categories</h5><hr /> */}
            {/* <div className="d-flex flex-column gap-2">
                {
                  apiCategory.map((category) => <Category category={category} key={category.id} />)
                }
              </div> */}
            {/* </div> */}
            {/* <div className="top-posts text-black bg-white w-100 border border-1 fd-hover-border-primary p-3 my-5">
              <h5>Recents Posts</h5><hr />
              {
                blogInfo.map((blogInfo) => {
                  return <div key={blogInfo.blog_id} className='d-flex gap-3 mb-3'>
                    <div className="post-image w-25"><Link to={"/blog/" + blogInfo.blog_id} className='text-black'><img src={blogInfo.img} alt={blogInfo.title} className='w-100 h-75' /></Link></div>
                    <div className="post-details">
                      <h6 className="fw-bold m-0"><Link to={"/blog/" + blogInfo.blog_id} className='text-black'>{blogInfo.title}</Link></h6>
                      <div><span className="opacity-50">{blogInfo.date}</span></div>
                    </div>
                  </div>
                })
              }
            </div> */}
            <div className="d-none d-lg-block">
              <h1>Blog Posts</h1>
              <ul>
                {data?.data.map((blog: {
                  [x: string]: string | undefined; id: string; title: string; content: string
                }) => (
                  <li key={blog.id}>
                    <img src={blog.img} alt={blog.title} className='w-100 h-75 cover' />
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* <Tags /> */}
            {/* <Archives /> */}
          </aside>
        </div>
      </div>
      <Footer />
    </>
  )

}

export default BlogPage;