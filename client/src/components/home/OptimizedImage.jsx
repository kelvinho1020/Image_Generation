import React, { useState } from 'react'
import { Blurhash } from "react-blurhash"
import { LazyLoadImage } from "react-lazy-load-image-component";

const OptimizedImage = ({photo, hash, _id}) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isLoadStarted, setLoadStarted] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  }

  const handleLoadStarted = () => {
    setLoadStarted(true);
  }

  return (
    <div className="relative rounded-xl">
     <LazyLoadImage
        className="w-full h-auto object-cover rounded-xl aspect-square"
        key={_id}
        src={photo}
        onLoad={handleLoad}
        beforeLoad={handleLoadStarted}
     />
     {!isLoaded && isLoadStarted && (
      <Blurhash
        className="blurhash absolute z-20 top-0 left-0 rounded-xl w-full h-full"
        hash={hash}
        resolutionX={32}
        resolutionY={32}
        punch={1}
      />
     )}
     </div>
  )
}

export default OptimizedImage