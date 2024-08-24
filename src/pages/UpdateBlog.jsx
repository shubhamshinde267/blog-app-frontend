import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";
import JoditEditor from "jodit-react";
import Base from '../components/Base';
import { useNavigate, useParams } from 'react-router-dom';
import userContext from '../context/userContext';
import {loadPost, updatePost as doUpdatePost} from '../services/post-service'
import { toast } from 'react-toastify';
import { loadAllCategories } from '../services/category-service';

function UpdateBlog() {

    const editor =useRef(null);
    const [categories,setCategories] = useState([]);
    const {blogId} = useParams();
    const object = useContext(userContext);
    const navigate = useNavigate();
    const [post,setPost] = useState({});

    useEffect(()=>{
        //Load the Categories
        loadAllCategories().then((data)=>{
            console.log(data);
            setCategories(data);
        }).catch((error)=>{
            console.log(error);
        })

        //Load the blog from database
        loadPost(blogId).then((data)=>{
            setPost({...data,categoryId:data.category.categoryId});
        }).catch((error)=>{
            console.log(error);
            toast.error("Error loading blog");
        })
    },[]);

    useEffect(()=>{
        if(!post){
            if(post.user.id != object.user.data.id)
            {
                toast.error("This is not your post !!")
                navigate("/")
            }
        }
    },[post]);

    const handleChange=(event,fieldName)=>{
        setPost({
            ...post,
            [fieldName]: event.target.value,
        })
    }

    const updatePost=(event)=>{
        event.preventDefault();
        console.log(post);
        doUpdatePost({...post,category:{categoryId:post.categoryId}},post.postId)
        .then((res)=>{
            console.log(res);
            toast.success("Post updated successfully");
        }).catch((error)=>{
            console.log(error);
            toast.error("Error updating post");
        })
            
    }

    const updateHtml = ()=>{
        return (
            <div className="wrapper">
                {/* {JSON.stringify(post)} */}
            <Card className="shadow-sm border-0 mt-2">
                <CardBody>
                    {/* {JSON.stringify(post)} */}
                    <h3>Update post from here !!</h3>
                    <Form onSubmit={updatePost}>
                        <div className="my-3">
                            <Label for="title">Post Title</Label>
                            <Input 
                            type="text" 
                            id="title"
                            name="title"
                            value={post.title}
                            placeholder="Enter title here..."
                            className="rounded-0"
                            onChange={(event)=>handleChange(event,'title')}
                            /> 
                        </div>

                        <div className="my-3">
                            {/* <Label for="content">Post Content</Label>
                            <Input 
                            type="textarea" 
                            id="content"
                            placeholder="Enter content here..."
                            className="rounded-0"
                            style={{height: '300px'}}
                            />  */}
                            <JoditEditor
                            ref={editor}
                            value={post.content}
                            
                            onChange={newContent=>setPost({...post, content: newContent})}
                            />
                        </div>

                        {/* File Field */}
                        <div className="mt-3">
                            <Label for="image">Select Post banner</Label>
                            <Input 
                            type="file" 
                            id="image"
                            // onChange={''}
                            />
                        </div>

                        <div className="my-3">
                            <Label for="category">Post Category</Label>
                            <Input 
                            type="select"  
                            id="category"
                            placeholder="Enter content here..."
                            className="rounded-0"
                            name="categoryId"
                            value={post.categoryId}
                            onChange={(event)=>handleChange(event,'categoryId')}
                            
                            >
                                <option value={0} disabled>--Select Category--</option>
                                {
                                    categories.map((category) =>(
                                        <option value={category.categoryId} key={category.categoryId}>
                                            {category.categoryTitle}
                                        </option>
                                        )
                                    )
                                }
                                
                            </Input>
                        </div>

                        <Container className="text-center">
                            <Button type="submit" className="rounded-0" color="primary">Update Post</Button>
                            <Button className="rounded-0 ms-2" color="danger">Reset Content</Button>
                        </Container>
                    </Form>
                    
                </CardBody>
            </Card>
        </div>
        )
    }

  return (
    <Base>
        <Container>
            {post && updateHtml()}
        </Container>
    </Base>
  )
}

export default UpdateBlog;