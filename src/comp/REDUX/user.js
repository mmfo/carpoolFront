import produce from 'immer'

const initialState = { 
    id:"7",
    userName :"ג",
    userPassword :"11111111",
    userEmail :"m0583267055@gmail.com"
}
const reducer = {
    UPDATE_CURRENT_USER(state, action) {
        state.id = action.payload.id
        state.userName = action.payload.userName
        state.userPassword = action.payload.userPassword
        state.userEmail = action.payload.userEmail
    },
    // DELETE_PRODUCT(state, action) {
    //     state.products.splice(action.payload, 1)
    // }
}
export default produce((state, action) => {
    if (reducer[action.type])
        reducer[action.type](state, action)
}
    , initialState)
