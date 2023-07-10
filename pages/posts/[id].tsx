import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { postActions } from "../../redux/posts/postsSlice";
import { AuthorType, CommentInfoType, PostType } from "../../utilities/types";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import classNames from "../../helpers/classNames";

type Props = {
    postDetail: PostType;
    postComments: CommentInfoType;
    postAuthorDetail: AuthorType;
}

export default function PostDetail({ postDetail, postComments, postAuthorDetail }: Props) {
    const dispatch = useDispatch();
    const commentsList = postComments.comments;

    useEffect(() => {
        dispatch(postActions.setPostDetailList({ ...postDetail, comments: commentsList, author: postAuthorDetail, isSeen: true }));
    }, [])

    const generateFakerAvatar = () => {
        const randomImage = faker.image.avatar();
        return randomImage;
    };

    const generateFakerImage = () => {
        const randomImage = faker.image.urlPicsumPhotos();
        return randomImage;
    };

    return (
        <>
            <div className="max-w-7xl mx-auto px-6 lg:px-0">
                <h2 className="mt-10 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-5xl text-center lg:text-left">{postDetail.title}</h2>
                <div className="space-x-4 mt-6 text-center lg:text-left">
                    {postDetail.tags.map((tag =>
                        <span key={tag} className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                            {tag}</span>
                    ))}
                </div>
                <div className="flex flex-col-reverse lg:flex-row justify-between mt-10 text-center lg:text-left">
                    <div className="text-gray-500 w-full lg:w-5/6 text-xl">
                        <Image width={1000} height={480} placeholder='blur' blurDataURL={generateFakerImage()} className="rounded-lg mb-4 h-72 w-full object-cover" src={generateFakerImage()} alt={postDetail.title} />
                        <div>
                            {postDetail.body}
                        </div>
                    </div>
                    <div className="w-full lg:w-1/5 lg:ml-5 flex items-center flex-row justify-between lg:justify-start lg:items-start lg:flex-col">
                        <h2 className="lg:mt-10 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-xl lg:border-b lg:w-full text-left">Author</h2>
                        <div className="flex text-sm text-gray-500 space-x-4">
                            <div className="flex-none py-5">
                                <img src={postAuthorDetail.image} alt={postAuthorDetail.firstName} className="w-10 h-10 bg-gray-100 rounded-full" />
                            </div>
                            <div className="border-gray-200 py-5">
                                <h3 className="font-medium text-gray-900">{postAuthorDetail.firstName + " " + postAuthorDetail.lastName}</h3>
                                <div
                                    className="mt-4 prose prose-sm max-w-none text-gray-500"
                                >{postAuthorDetail.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    {commentsList.map((comment, index) =>
                        <div key={comment.id}>
                            <div className="flex items-center text-sm text-gray-500 space-x-4">
                                <div className="flex-none py-3">
                                    <img src={generateFakerAvatar()} alt={comment.user.username} className="w-10 h-10 bg-gray-100 rounded-full" />
                                </div>
                                <div className={classNames(index === 0 ? "" : "border-t", "border-gray-200 py-3")}>
                                    <h3 className="font-medium text-gray-900">{comment.user.username}</h3>
                                    <div
                                        className="mt-4 prose prose-sm max-w-none text-gray-500"
                                    >{comment.body}</div>
                                </div>
                            </div>
                        </div>)}
                </div>
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