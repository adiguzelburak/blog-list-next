import { useEffect } from "react";
import { PostType } from "../../utilities/types";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../redux/posts/postsSlice";

type Props = {
    postDetail: PostType;
}

export default function PostDetail({ postDetail }: Props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(postActions.setPostDetailList(postDetail))
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
            </div>
        </>
    )
}


export async function getServerSideProps(context: any) {
    const { query } = context;

    const response = await fetch(`https://dummyjson.com/posts/${query.id}`);
    const postDetail = await response.json();

    return {
        props: {
            postDetail,
        },
    };
}