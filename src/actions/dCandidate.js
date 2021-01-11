import api from './api';

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE:'UPDATE',
    DELETE:'DELETE',
    FETCH_ALL:'FETCH_ALL'
}

const formatData = data =>({
    ...data,
    age: parseInt(data.age?data.age:0)
})

export const fetchAll = () => dispatch => {
    // get api request
    api.dCandidate().fetchAll()
    .then(response => {
        console.log(response.data);
        dispatch({
            type: ACTION_TYPES.FETCH_ALL,
            payload: response.data
        })
    }
    )
    .catch(err => console.log(err));
    
}

export const create = (data, onSuccess) => dispatch => {
    data = formatData(data);
    api.dCandidate().create(data)
    .then(response => {
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: response.data
        });
        onSuccess();
    })
    .catch(err => console.log(err));
}

export const update = (id,data, onSuccess) => dispatch => {
    data = formatData(data);
    api.dCandidate().update(id,data)
    .then(response => {
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: {id,...data}
        });
        onSuccess();
    })
    .catch(err => console.log(err));
}

export const Delete = (id, onSuccess) => dispatch => {
    api.dCandidate().delete(id)
    .then(response => {
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        });
        onSuccess();
    })
    .catch(err => console.log(err));
}










// Previously what we used to do before redux-thunk
// In this case async calls were not possible to API

// We have installed thunk middleware and now we can make async functions

// export const create = data => {
//     return {
//         type:'create',
//         payload : data
//     }
// }

// dispatch(create({fullName:''}))