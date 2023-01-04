import React, {useEffect, useState} from 'react';
import axios from 'axios';
import _ from 'lodash';

const pageSize = 20;
const Postes = () => {
    const [posts, setPosts] = useState();
    const [paginatedPosts, setPaginatedPosts] = useState();
    const [currentPage, setCurrentPage] = useState(1);
        useEffect(()=>{
        axios.get('http://universities.hipolabs.com/search?country=India')
        .then(res=>{
            console.log(res.data);
            setPosts(res.data);
            setPaginatedPosts(_(res.data).slice(0).take(pageSize).value());
        })
    },[])

    const pageCount = posts? Math.ceil(posts.length/pageSize) :0;
    if(pageCount === 1) return null;
    const pages = _.range(1, pageCount+1);
    const pagination=(pageNo)=>{
        setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedpost = _(posts).slice(startIndex).take(pageSize).value();
        setPaginatedPosts(paginatedpost);
    }
    return ( 
        <div>{
            !paginatedPosts ? ("No data found"):(
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Country</th>
                            <th>University Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paginatedPosts.map((post, index)=>(
                                <tr key={index}>
                                    <td>{post.id}</td>
                                    <td>{post.country}</td>
                                    <td>{post.name}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )}
            <nav className='d-flex justify-content-center'>
                <ul className='pagination'>
                    {
                        pages.map((page)=>(
                            <li className= {
                                page === currentPage ? "page-item active" : "page-item"
                            }><p className='page-link'
                            onClick={()=>pagination(page)}>{page}</p></li>
                        ))
                    }
                </ul>
            </nav>
            </div>
     );
}
 
export default Postes;