'use client'
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import Article from './Article';

function News() {
    const { data, isPending, error } = useFetch(
        `${process.env.NEXT_PUBLIC_API_URI}/news/getPopular`
      );
      React.useEffect(() => {
        console.log(data);
      }, [data]);
  return (
    <div className='news'>
        <h2 style={{color: 'white'}}>News</h2>
        {isPending && <>Loading...</>}
        {data && data.articles.map(article => (
            <Article title={article.title} description={article.description} image={article.urlToImage} url={article.url}/>
        ))}
    </div>
  )
}

export default News