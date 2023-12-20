import { authInfo } from "../store";

export type CommentType = {
    body: string;
    author: string;
    timestamp: Date;
};

export type UserType = {
    ID: number;
    email: string;
    username: string;
    password: string;
    imageUrl?: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null;
    comments: null;
    threads: null;
};

export type CategoryType = {
    ID: number;
    name: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null;
    threads: null;
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
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null;
    comments: null;
};

export type selectorStateType = { auth: authInfo };
