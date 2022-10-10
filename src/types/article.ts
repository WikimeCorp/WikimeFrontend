export interface ArticleState {
    articles: any[];
    loading: boolean;
    error: null | string;
}

export enum ArticleActionTypes {
    FETCH_ARTICLES = "FETCH_ARTICLES",
    FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS",
    FETCH_ARTICLES_ERROR = "FETCH_ARTICLES_ERROR",
}

interface FetchArticleAction {
    type: ArticleActionTypes.FETCH_ARTICLES;
}

interface FetchArticleSuccessAction {
    type: ArticleActionTypes.FETCH_ARTICLES_SUCCESS;
    payload: any[];
}

interface FetchArticleErrorAction {
    type: ArticleActionTypes.FETCH_ARTICLES_ERROR;
    payload: string;
}

export type ArticleAction = FetchArticleAction | FetchArticleErrorAction | FetchArticleSuccessAction
