import React from 'react'
import { Breadcrumb } from 'antd';
import './index.less'
import { Link, useLocation } from 'react-router-dom';
import { PathMap } from '../../config/appConfig'
import { ReactIf } from '../ReactIf';

export function CBreadcrumb() {
    const location = useLocation()

    const pathSnippets = location.pathname.split('/').filter((i, index )=> {
        return i
    });
    const router = pathSnippets.shift()
    const currentPath = `/${pathSnippets.slice(0, pathSnippets.length).join('/')}`;
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
        <Breadcrumb.Item key={url}>
          <Link to={'/' + router + url}>{PathMap[url] || 'path'}</Link>
        </Breadcrumb.Item>
      );
    });
    
    return <div>
        <div className='flex-row-center'>
        <div className='text_page-title'> { PathMap[currentPath] } </div>
            <ReactIf show={pathSnippets.length > 1}>
                <div className='breadcrumb'>
                    <Breadcrumb>
                        {extraBreadcrumbItems}
                    </Breadcrumb>
                </div>  
            </ReactIf>  
        </div>
    </div>
}