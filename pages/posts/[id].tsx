import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { postActions } from "../../redux/posts/postsSlice";
import { AuthorType, CommentInfoType, PostType } from "../../utilities/types";

type Props = {
    postDetail: PostType;
    postComments: CommentInfoType;
    postAuthorDetail: AuthorType;
}

export default function PostDetail({ postDetail, postComments, postAuthorDetail }: Props) {
    const dispatch = useDispatch();
    const commentsList = postComments.comments;

    useEffect(() => {
        dispatch(postActions.setPostDetailList({ ...postDetail, comments: commentsList, author: postAuthorDetail }));
    }, [])

    return (
        <>
            <div>
                {postDetail.title}
                {postDetail.body}
                {postDetail.id}
                {postDetail.reactions}
                {postDetail.tags.map((tag => ", " + tag))}
                {postDetail.userId}

                <div>Comments</div>
                {commentsList.map((comment =>
                    <ul key={comment.id}>
                        <li>{comment.postId}</li>
                        <li>{comment.body}</li>
                        <li>{comment.user.id}</li>
                        <li>{comment.user.username}</li>
                    </ul>))}

                <div>Author Info</div>
                {postAuthorDetail.age}
                {postAuthorDetail.email}
                {postAuthorDetail.firstName}
                {postAuthorDetail.lastName}
                {postAuthorDetail.gender}
                {postAuthorDetail.username}
                {postAuthorDetail.phone}

            </div>
        </>
    )
}


export async function getServerSideProps(context: any) {
    const { query } = context;

    const responsePostAuthorDetail = await fetch(`https://dummyjson.com/user/${query.id}`);
    const responsePostDetail = await fetch(`https://dummyjson.com/posts/${query.id}`);
    const responseComments = await fetch(`https://dummyjson.com/posts/${query.id}/comments`);
    const postDetail = await responsePostDetail.json();
    const postComments = await responseComments.json();
    const postAuthorDetail = await responsePostAuthorDetail.json();

    return {
        props: {
            postDetail,
            postComments,
            postAuthorDetail
        },
    };
}