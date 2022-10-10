import { ArticleAction, ArticleState, ArticleActionTypes } from "../../types/article";

const initialState: ArticleState = {
    articles: [],
    loading: false,
    error: null
}

export const ArticleReducer = (state = initialState, action: ArticleAction): ArticleState => {
    switch (action.type) {
        case ArticleActionTypes.FETCH_ARTICLES:
            return {loading: true, error: null, articles: []}
        case ArticleActionTypes.FETCH_ARTICLES_SUCCESS:
            return {loading: false, error: null, articles: action.payload}
        case ArticleActionTypes.FETCH_ARTICLES_ERROR:
            return {loading: false, error: action.payload, articles: []}
        default:
            return state
    }
}
