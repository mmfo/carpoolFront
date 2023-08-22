import produce from 'immer'

const initialState = { 
    id:"-5",
    userName :"ג",
    userPassword :"11111111",
    userEmail :"m0583267055@gmail.com",
    userPhone:"000"
}
const reducer = {
    UPDATE_CURRENT_USER(state, action) {
        state.id = action.payload.id?action.payload.id:0
        state.userName = action.payload.userName
        state.userPassword = action.payload.userPassword
        state.userEmail = action.payload.userEmail
        state.userPhone = action.payload.userPhone
    },
    UPDATE_CURRENT_USER1(state, action) {
        state.id = action.payload.id?action.payload.id:0
        state.userName = action.payload.UserName
        state.userPassword = action.payload.UserPassword
        state.userEmail = action.payload.UserEmail
        state.userPhone = action.payload.UserPhone
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
