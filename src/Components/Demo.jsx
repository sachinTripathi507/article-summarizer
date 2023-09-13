import { useEffect, useState } from "react";
import React from 'react';
import { linkIcon, loader, tick, copy } from "../assets"
import { useLazyGetSummaryQuery } from "../services/article";


const Demo = () => {
  const [Article, setArticle] = useState({
    url: "",
    summary: "",
  })
  const [allArticle, setallArticle] = useState([]);
  const [copied, setCopied] = useState("");
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setallArticle(articlesFromLocalStorage);

    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleurl: Article.url });
    if (data?.summary) {
      const newArticle = { ...Article, summary: data.summary };

      const updatedallArticle = [newArticle, ...allArticle];
      setArticle(newArticle);
      setallArticle(updatedallArticle);
      localStorage.setItem("articles", JSON.stringify(updatedallArticle));


      console.log(data);
    }
    else console.log(allArticle);
  }
  const handlecopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  }
  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form className="relative w-full flex justify-center items-center" onSubmit={handleSubmit}>
          <img src={linkIcon} alt="link icon" className="absolute left-0 my-2 ml-3 w-5 z-10" name='form' />
          <input type="url" placeholder='Enter a url' value={Article.url}
            onChange={(e) => setArticle({ ...Article, url: e.target.value })} required className='url_input peer' />
          <button type='submit'
            className='submit_btn peer-focus:border-r-gray-700 peer-focus:text-gray-700'>
            <p>↵</p>
          </button>
        </form>
        {/* display history */}
        <div className='flex flex-col gap-1  max-h-60 overflow-y-auto'>
          {allArticle.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link_card '
            >
              <div className='copy_btn ' onClick={() => handlecopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}

                  alt='copy'
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* display summary  */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            SOMETHING GOES WRONG WITH YOUR REQUEST!
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : Article.summary && (
          <div className="flex flex-col gap-3">
            <h2 className="font-satoshi font-bold text-gray-600 text-xl ml-[35%] ">
              Article <span className="blue_gradient">Summary</span>
            </h2>
            <div className="summary-box">
              <p className="font-inter font-medium text-sm text-gray-700">{Article.summary}</p>
            </div>
          </div>
        )

        }

      </div>
    </section>


  )
}

export default Demo;