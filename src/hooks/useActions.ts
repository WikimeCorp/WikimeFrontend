import { bindActionCreators } from "redux";
import { useAppDispatch } from "./redux";
import * as ArticleActionCreators from "../store/action-creators/article";

export const useActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(ArticleActionCreators, dispatch)
}