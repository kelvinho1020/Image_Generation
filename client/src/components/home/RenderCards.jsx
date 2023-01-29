import { useRef, useCallback } from "react";
import { Card } from './index.js'

const RenderCards = ({data, title, isLoading, hasMore, setPostPage, isSearch}) => {
  const observer = useRef();
  const lastPostRef = useCallback(node => {
    if(isLoading) return;

    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore) {
        console.log("visible")
        setPostPage(prev => prev + 1);
      }
    });

    if(node) observer.current.observe(node);
    console.log(node);
  }, [isLoading, hasMore]);

  if(data?.length > 0){
    return data.map((post, index) => {
      if(data.length === index + 1 && !isSearch) {
        return (<Card innerRef={lastPostRef} key={post._id} {...post} />)
      } else {
        return (<Card key={post._id} {...post} />)
      }
    })
  }
  
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  )
}

export default RenderCards