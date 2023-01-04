import React, {useEffect, useState} from 'react';
import axios from 'axios';
import _ from 'lodash';

const pageSize = 10;
const Postes = () => {
    const [posts, setPosts] = useState();
    useEffect(()=>{
        axios.get('http://universities.hipolabs.com/search?country=India')
        .then(res=>{
            console.log(res.data);
            setPosts(res.data);
        })
    },[])

    const pageCount = posts? Math.ceil(posts.length/pageSize) :0;
    if(pageCount === 1) return null;
    const pages = _.range(1, pageCount+1);
    return ( 
        <div>{
            !posts ? ("No data found"):(
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Country</th>
                            <th>University Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((post, index)=>(
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
                            <li className='page-link'>{pages}</li>
                        ))
                    }
                </ul>
            </nav>
            </div>
     );
}
 
export default Postes;