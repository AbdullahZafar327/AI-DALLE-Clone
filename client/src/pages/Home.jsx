import React,{useState,useEffect} from 'react'
import {Loader,Card,FormField } from '../components/index'

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
    const [loading,setLoading] = useState(false);
    const [allPosts,setAllPosts] = useState(null);
    const [searchText,setSearchText] = useState('')
    const [searchedResults,setSearchedResults] = useState(null)
    const [searchTimeOut,setSearchTimeOut] = useState(null)

    const fetchPosts = async () =>{
      setLoading(true)
       try {
        const response = await fetch('http://localhost:8080/api/v1/posts',{
          method:'GET',
          header:{
            'Content-Type':'application/json'
          }
        })
        if(response.ok){
          const result = await response.json();
          setAllPosts(result?.data?.reverse())
        }
       } catch (error) {
        alert(error)
       }finally{
        setLoading(false)
       }
     }
    
    useEffect(()=>{
     fetchPosts()
    },[])

    const setSearchChange = (e) =>{
    clearTimeout(searchTimeOut)
    setSearchText(e.target.value);

    setSearchTimeOut(
    setTimeout(() => {
      const searchResults = allPosts?.filter((item)=>item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()))
      setSearchedResults(searchResults)
    }, 500)
    )
    }

  return (
    <section className='w-max-7xl mx-auto'>
        <div>
         <h1 className='font-extrabold text-[#222328] text-[32px]'>The community showCase</h1>
         <p className='text-[#666375] mt-2 text-[14px] max-w-[500px]'>
            Browse through imaginative collection of Visually Stunning images By Dalle-E
         </p>
        </div>

        <div className='mt-16'>
            <FormField
            labelName="Search Posts"
            name="text"
            type="text"
            placeholder="Search Posts"
            onChange={setSearchChange}
            value={searchText}
            />
        </div>

        <div className='mt-10'>
           {loading? (
            <div className='flex justify-center items-center'>
             <Loader/>
            </div>
           ):(
            <> 
             {searchText&&(
                <h1 className='font-medium text-[#666e75] text-xl mb-3'>
                    Showing Results for <span className='text-[#222328]'>{searchText}</span>
                </h1>
             )}

             <div className='grid lg:grid-cols-4 sm:grid-col-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                {searchText? (
                    <RenderCards
                    data={searchedResults}
                    title="No search Results Found"
                    />
                ):(
                  <RenderCards
                  data={allPosts}
                  title="No Posts Yet"
                />
                )}
             </div>
            </>
           )}
        </div>
    </section>
  )
}

export default Home
