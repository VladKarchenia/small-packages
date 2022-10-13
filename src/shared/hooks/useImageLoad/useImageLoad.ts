import React, { useState } from "react";

export const useImageLoad = () => {
  const [isLoaded, setLoaded] = useState(false);

  const onLoad: React.ReactEventHandler<HTMLImageElement> = () => setLoaded(true);

  return { isLoaded, onLoad };
};
