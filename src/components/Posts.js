import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import DeletePost from './DeletePost';
import EditPost from './EditPost';


const Posts = ({data, loading}) => {

    const [currentData, setCurrentData] = useState([]);
    const [editBox, setEditBox] = useState(false);
    const [deleteBox, setDeleteBox] = useState(false);

    // OPEN
    const openDeleteBox = () => {
        setDeleteBox(true);
    }

    const openEditBox = () => {
        setEditBox(true);
    }

    // CLOSE
    const closeEditBox = () => {
        setEditBox(false);
    }

    const closeDeleteBox = () => {
        setDeleteBox(false);
    }

    if (loading) { return <li className="loading">Fetching Information</li> }

    return (
        <>
            {
                data != '' ?
                    data.map((info, key) => 
                        <li className="item" key={key}>
                            <div className="content">
                                <div className="meta">
                                    <span>AUTHOR: {info.author}</span>
                                    <span>{info.created_at}</span>
                                </div>
                                <Link to={{
                                    pathname: '/post',
                                    state: {
                                        title: info.title,
                                        content: info.content
                                    }
                                }} className="title">
                                    {info.title}
                                </Link>
                                <div className="desc">
                                    {info.content.substring(0, 70)}...
                                </div>
                            </div>
                            <div className="controls">
                               <a className="mr-2" onClick={() => {
                                                    openDeleteBox()
                                                    setCurrentData(info)
                                                }
                                            }>
                                    <FaTrashAlt/>
                               </a>
                               <a className="mr-2" onClick={() => {
                                                    openEditBox() 
                                                    setCurrentData(info)
                                                } 
                                            } >
                                    <FaEdit />
                               </a>
                            </div>
                        </li>
                    )
                :
                
                <li>NO DATA</li>
            }

            <DeletePost currentData={currentData} closeDeleteBox={closeDeleteBox} deleteBox={deleteBox} />
            <EditPost currentData={currentData}  closeEditBox={closeEditBox} editBox={editBox} />
        </>
    )
}

export default Posts
