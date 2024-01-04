import { authInfo, likeSliceObj, threadSearch } from "../store";

export type UserType = {
    ID: number;
    email: string;
    username: string;
    imageUrl?: string;
    comments: null;
    threads: null;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null;
};

export type CategoryType = {
    ID: number;
    name: string;
    threads: null;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null;
};

export type ThreadType = {
    ID: number;
    title: string;
    content: string;
    imageUrl: string;
    userId: number;
    user: UserType;
    categoryId: number;
    category: CategoryType;
    comments: CommentType[];
    likes: ThreadLikeType[];
    favourites: FavouriteType[];
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null;
};

export type CommentType = {
    ID: number;
    content: string;
    threadId: number;
    userId: number;
    user: UserType;
    likes: CommentLikeType[];
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null;
};

export type FavouriteType = {
    ID: number;
    threadId: number;
    userId: number;
    user: UserType;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null;
};

export type ThreadLikeType = {
    ID: number;
    threadId: number;
    userId: number;
    user: UserType;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null;
};

export type CommentLikeType = {
    ID: number;
    commentId: number;
    userId: number;
    user: UserType;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null;
};

export type selectorStateType = { auth: authInfo; search: threadSearch; like: likeSliceObj[] };
