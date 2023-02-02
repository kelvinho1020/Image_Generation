import React, { useState, useEffect } from 'react'
import { Loader } from '../components/common'
import { RenderCards, SearchBar } from '../components/home'
import { apiGetPost } from "../api"

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [postPage, setPostPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchedresults, setSearchedResults] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      
      try {
        const response = await apiGetPost(postPage);
        const result = response.data.data;

        result.forEach(post => {
          const url = post.photo;
          let sliceIdx = url.indexOf("upload/");
          let formattedPhoto = url.substring(0, sliceIdx + 7) + "f_webp/" + url.substring(sliceIdx + 7);

          post.formattedPhoto = formattedPhoto;
        })

        setAllPosts([...allPosts, ...result]);
        setHasMore(result.length > 0)

      } catch(err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  },[postPage]);

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">The Community Showcase</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w[500px]">
          Browse through a collection of imaginative and visually stunning images generated by DALL-E AI
        </p>
      </div>

      <SearchBar 
        setSearchedResults={setSearchedResults} 
        setLoading={setLoading} 
        setSearchText={setSearchText} 
        searchText={searchText} 
      />

      <div className="mt-10">
        <>
          {searchText && (
            <h2 className="font-medium text-[#666e75] text-xl mb-3">
              Showing results for <span className="text-[#222328]">{searchText}</span>
            </h2>
          )}
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
            {searchText ? (
              <RenderCards 
                isSearch={true}
                setPostPage={setPostPage}
                hasMore={hasMore} 
                isLoading={loading} 
                data={searchedresults} 
                title="No search results found" 
                />
                ): (
              <RenderCards 
                isSearch={false}
                setPostPage={setPostPage}
                hasMore={hasMore} 
                isLoading={loading} 
                data={allPosts} 
                title="No posts found" 
              />
            )}
          </div>
        </>
        {loading && (
          <div className="flex justify-center items-center mt-10">
            <Loader />
          </div>
        )}
      </div>
    </section>
  )
}

export default Home