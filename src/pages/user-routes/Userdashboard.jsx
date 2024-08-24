import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import AddPost from "../../components/AddPost";
import { Container } from "reactstrap";
import { getCurrentUserDetail } from "../../auth";
import { deletePostService, loadPostUserWise } from "../../services/post-service";
import { toast } from "react-toastify";
import Post from "../../components/Post";

const Userdashboard = () => {
  const [user,setUser] = useState({});
  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    console.log(getCurrentUserDetail());
    setUser(getCurrentUserDetail);

    loadPostData();
  },[]);

  function loadPostData(){
    loadPostUserWise(getCurrentUserDetail().id).then((data)=>{
      console.log(data);
      setPosts([...data]);
    }).catch((error)=>{
      console.log(error);
      toast.error("Error in loading user posts");
    });
  }

  //Function to delete user post
  function deletePost(post){
    //Going to delete the post
    deletePostService(post.postId).then((response)=>{
      console.log(response);
      toast.success("Post deleted successfully");
      //loadPostData();
      let newPosts = posts.filter(p=>p.postId != post.postId);
      setPosts([...newPosts]);
    }).catch((error)=>{
      console.log(error);
      toast.error("Error in deleting post");
    }) 
  }

  return (

    <Base>
      <Container>
        <AddPost/>
        
        <h1 className="mt-3">Post Count ({posts.length})</h1>

        {
          posts.map((post,index)=>{
            return (
              <Post post={post} key={index} deletePost={deletePost} />
            )
          })
        }
      </Container>
    </Base>
  );
};

export default Userdashboard;
