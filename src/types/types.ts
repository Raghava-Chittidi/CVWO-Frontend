import { authInfo } from "../store";

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
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null;
};

export type selectorStateType = { auth: authInfo; thread: { currentThread: ThreadType } };
