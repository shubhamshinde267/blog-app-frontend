import { myAxios, privateAxios } from "./helper"

//Create Post Function
export const createPost=(postData) => {
    // console.log(postData);
    return privateAxios
        .post(`/user/${postData.userId}/category/${postData.categoryId}/posts`,postData).then((response)=>response.data)
}

//Get all Posts
export const loadAllPosts =(pageNumber,pageSize) =>{
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then((response)=>response.data)
}

//Load single post of given Id
export const loadPost=(postId)=>{
    return myAxios.get("/posts/"+postId).then((response)=>response.data);
}

//Create Comment
export const createComment=(comment,postId)=>{
    return privateAxios.post(`/post/${postId}/comments`,comment)
}

//Upload Post banner image
export const uploadPostImage=(image,postId)=>{
    let formData = new FormData();
    formData.append("image",image);

    return privateAxios
            .post(`/post/image/upload/${postId}`,formData,
                {headers: {'Content-Type':'multipart/form-data'}
            })
                .then((response)=>response.data)
}

//Get Category wise Posts
export function loadPostCategoryWise(categoryId){
    return privateAxios.get(`/category/${categoryId}/posts`).then((response)=>response.data)
}

//Load posts User wise
export function loadPostUserWise(userId){
    return privateAxios.get(`/user/${userId}/posts`).then((response)=>response.data)
}

//Delete the post
export function deletePostService(postId){
    return privateAxios.delete(`/posts/${postId}`).then((response)=>response.data)
}

//Update the post
export function updatePost(post,postId){
    console.log(post);
    return privateAxios.put(`/posts/${postId}`,post).then((response)=>response.data)
}