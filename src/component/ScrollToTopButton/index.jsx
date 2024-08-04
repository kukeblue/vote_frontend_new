import React, { useState, useEffect } from 'react';
import './index.less'
const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const styles = {
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    bottom: '3rem',
    right: '0.5rem',
    backgroundColor: '#fff',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    width: '1.03rem',
    height: '1rem',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // 添加阴影
  };

  const checkScrollTop = () => {
    const element = document.getElementById('page-main');
    if (element) {
      if (!showButton && element.scrollTop > 400) {
        setShowButton(true);
      } else if (showButton && element.scrollTop <= 400) {
        setShowButton(false);
      }
    }
  };

  useEffect(() => {
    const element = document.getElementById('page-main');
    if (element) {
      element.addEventListener('scroll', checkScrollTop);
      return () => {
        element.removeEventListener('scroll', checkScrollTop);
      };
    }
  }, [showButton]);

  const scrollToTop = () => {
    const element = document.getElementById('page-main');
    if (element) {
      element.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div>
      {showButton && (
        <div onClick={scrollToTop} style={styles}>
            <span className='iconfont iconjump_top'></span>
        </div>
      )}
    </div>
  );
};

export default ScrollToTopButton