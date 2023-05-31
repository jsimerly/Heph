import { yard_healthy, top_10_diy, build_a_deck } from '../../../constants/assets/images/blog'
import { BlogCard } from '../auxillaryPages'

const BlogBanner = () => {
  return (
    <>
        <h1 className="text-center text-[36px] text-neutralDark mb-2">
            Our Blogs
        </h1>
        <div className="flex flex-col sm:flex-row justify-between gap-6 w-full ms:px-6">
            <BlogCard 
                img={yard_healthy} 
                title={'How to keep your yard healthy no matter what the elements bring.'}
                date={'Dec 16, 2022'}
                link={"10-fun-beach-games-12162022"}                
            />
            <BlogCard 
                img={top_10_diy} 
                title={"Top 10 Beginner DIY Projects"}
                date={'Jan 18, 2023'}
                link={'How-to-make-your-childs-first-beach-day-a-success-01182023'}
            />
            <BlogCard 
                img={build_a_deck} 
                title={'Building a DIY Deck that will Impress'}
                date={'Jan 4, 2023'}
                link={'coolest-spots-on-the-east-coast-01042023'}
            />
        </div>
        <div className="flex justify-center mt-6">
           <a href='/blogs' className='hover:underline hover:cursor-pointer text-neutralDark'> View All Blogs </a>
        </div>
    </>

  )
}

export default BlogBanner