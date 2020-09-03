import React, {useEffect, useState, useCallback } from "react";
import fb from './../config/firebase';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Posts from './Posts';
import Pagination from './Pagination';


export const List = () =>{

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerpage] = useState(10);
    const [search, setSearch] = useState('');

    useEffect( () =>{

        const fetchPosts = async () => {
            setLoading(true);

            await fb.database().ref('posts').on('value',(snap)=> {

                try{

                    let arr = [];

                    snap.forEach( (res) => {
                        const item = res.val();
                        item.key = res.key;
                        arr.push(item);
                    });     
                    
                    arr.sort((a,b) => {
                        let c = new Date(a.created_at)
                        let d = new Date(b.created_at)
                        return d-c;
                    }) 

                    setData(arr);
                    setLoading(false);


                    // SEARCH
                    let arrSearch = [];
                    arr.map(x => {
                        if(x.title.toLowerCase().indexOf(search.toLowerCase()) !== -1){
                            arrSearch.push(x)
                        }
                    })

                    setData(arrSearch);

                } catch(error){
                    console.log(error);
                } 
            })
        }

        fetchPosts();

    },[search]);

    

    const sortByDate = async () => {
        setLoading(true);

        await fb.database().ref('posts').on('value',(snap)=> {

            try{

                let arr = [];

                snap.forEach( (res) => {
                    const item = res.val();
                    item.key = res.key;
                    arr.push(item);
                });     
                

                arr.sort((a,b) => {
                    let c = new Date(a.created_at)
                    let d = new Date(b.created_at)
                    return d-c;
                }) 

                setData(arr);
                setLoading(false);


            } catch(error){
                console.log(error);
            } 
        })
    }

    const sortByTitle = async () => {
        setLoading(true);

        await fb.database().ref('posts').on('value',(snap)=> {

            try{

                let arr = [];

                snap.forEach( (res) => {
                    const item = res.val();
                    item.key = res.key;
                    arr.push(item);
                });     
                

                arr.sort((a,b) => {
                   return a.title.localeCompare(b.title)
                }) 

                setData(arr);
                setLoading(false);


            } catch(error){
                console.log(error);
            } 
        })
    }


    

    // Get current Users
    const indexOfLastUser = currentPage * dataPerPage;
    const indexOfFirstUser = indexOfLastUser - dataPerPage;
    const currentData = data.slice(indexOfFirstUser, indexOfLastUser);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return(
        <>
            <div className="list-wrapper">

                <input className="search" type="text" placeholder="SEARCH" onChange={(e) => setSearch(e.target.value)} />

                <div className="list-head">
                    {/* pagination top */}
                    <Pagination 
                        dataPerPage={dataPerPage} 
                        totalData={data.length} 
                        paginate={paginate} 
                    />

                    <div className="sort-wrapper">
                        <DropdownButton id="dropdown-basic-button" title="Sort By">
                            <Dropdown.Item onClick={sortByDate}>Date</Dropdown.Item>
                            <Dropdown.Item onClick={sortByTitle}>Title</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
                

                {/* Blog List */}
                <ul className="list">
                    <Posts data={currentData} loading={loading} />
                </ul>

                {/* pagination bottom */}
                <Pagination 
                    dataPerPage={dataPerPage} 
                    totalData={data.length} 
                    paginate={paginate} 
                />
                
            </div>
        </>
    )

}

export default List;