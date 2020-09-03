import React, {useEffect} from 'react';

const Post = (props) =>{

    return(
        <>
            <div className="main-body">
                <div className="single-wrapper">
                    <div className="title">
                        {props.location.state.title}
                    </div>
                    <div className="content">
                        {props.location.state.content}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post;