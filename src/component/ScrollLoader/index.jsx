import React, { useEffect, useRef } from 'react';

const ScrollLoader = ({ loadMore, hasMore }) => {
  const loadingRef = useRef(false);

  useEffect(() => {
    const div = document.getElementById('page-main');

    const handleScroll = () => {
      const isAtBottom = div.scrollHeight - div.scrollTop - div.clientHeight < 200;
      if (!div || !hasMore || loadingRef.current) return;
      if (isAtBottom) {
        loadingRef.current = true;
        loadMore().finally(() => {
          loadingRef.current = false;
        });
      }
    };

    div.addEventListener('scroll', handleScroll);

    return () => {
      div.removeEventListener('scroll', handleScroll);
    };
  }, [loadMore, hasMore]);

  return <div className='text-center text-color_dec text-base'>
    {hasMore && loadingRef.current && <div>加载中...</div>}
  </div>; // This component does not render anything
};

export default ScrollLoader;