// 引入外部常量作为方法名
import {
    SET_FOCUS_MODE,
    SET_IS_BLOG_RENDER_COMPLETE,
    SET_PARENT_COMMENT_ID,
    SAVE_CLIENT_SIZE,
} from '@/store/mutations-constant'

export default {
    [SET_FOCUS_MODE](state,focusMode){
        state.focusMode = focusMode
    },
    [SET_IS_BLOG_RENDER_COMPLETE](state,isBlogRenderComplete){
        state.isBlogRenderComplete = isBlogRenderComplete
    },
    [SET_PARENT_COMMENT_ID](state,parentCommentId){
        state.parentCommentId = parentCommentId
    },
    [SAVE_CLIENT_SIZE](state,clientSize){
        state.clientSize = clientSize
    }
}