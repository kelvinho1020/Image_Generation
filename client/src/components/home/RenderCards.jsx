import { useRef, useCallback } from "react";
import { Card } from './index.js'

const RenderCards = ({data, title}) => {
  const observer = useRef();
  const lastPostRef = useCallback(node => {
    console.log(node);
  });

  if(data?.length > 0){
    return data.map((post, index) => {
      if(data.length === index + 1) {
        return (<Card ref={lastPostRef} key={post._id} {...post} />)
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