import React, { useEffect, useState } from "react";
import { deletePostService, loadAllPosts } from "../services/post-service";
import {
  Col,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

function NewFeed() {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages:'',
    totalElements:'',
    pageSize:'',
    lastPage:false,
    pageNumber:'',
  });

  const [currentPage,setCurrentPage] = useState(0);

  useEffect(() => {
    //Load all the posts from server
    changePage(currentPage);
  }, [currentPage]);

  const changePage=(pageNumber=0,pageSize=5) => {
    if(pageNumber>postContent.pageNumber && postContent.lastPage){
        return;
    }
    if(pageNumber<postContent.pageNumber && postContent.pageNumber==0){
        return;
    }
    loadAllPosts(pageNumber,pageSize).then((data)=>{
        setPostContent({
          content:[...postContent.content, ...data.content],
          totalPages:data.totalPages,
          totalElements:data.totalElements,
          pageSize:data.pageSize,
          lastPage:data.lastPage,
          pageNumber:data.pageNumber,
        });
        console.log(data);
        //window.scrollTo(0,0);
    }).catch((error)=>{
        toast.error("Error in loading posts");
    })

  }

  const changePageInfinite=() =>{
    console.log("Page changed");
    setCurrentPage(currentPage+1);
  }

  //Function to delete user post
  function deletePost(post){
    //Going to delete the post
    deletePostService(post.postId).then((response)=>{
      console.log(response);
      toast.success("Post deleted successfully");
      
      let newPostContent = postContent.content.filter(p=>p.postId!=post.postId)
      setPostContent({...postContent, content: newPostContent})
    }).catch((error)=>{
      console.log(error);
      toast.error("Error in deleting post");
    }) 
  }

  return (
    <div className="container-fluid">
      <Row>
        <Col md={{ size: 12 }}>
          <h1>Blogs Count ({postContent?.totalElements})</h1>

          <InfiniteScroll
          dataLength={postContent.content.length}
          next={changePageInfinite}
          hasMore={!postContent.lastPage}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          >
            {postContent?.content.map((post) => (
              <Post deletePost={deletePost} post={post} key={post.postId} />
            ))
            }
          </InfiniteScroll>



          {/* <Container className="mt-3">
            <Pagination size="lg">
              <PaginationItem onClick={()=>changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber==0}>
                <PaginationLink previous>
                    Previous
                </PaginationLink>
              </PaginationItem>

              {
                [...Array(postContent.totalPages)].map((item,index)=>(
                    <PaginationItem onClick={()=>changePage(index)} active={index==postContent.pageNumber} key={index}>
                        <PaginationLink>
                            {index+1}
                        </PaginationLink>
                    </PaginationItem>
                ))
              }

              <PaginationItem onClick={()=>changePage(postContent.pageNumber+1)} disabled={postContent.lastPage}>
                <PaginationLink next>
                    Next
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </Container> */}
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;
