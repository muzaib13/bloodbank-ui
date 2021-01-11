import axios from 'axios';

const baseurl = 'http://localhost:63970/';

export default {
    dCandidate(url = baseurl + 'api/DCandidate/'){
        return {
            fetchAll : () => axios.get(url),
            fetchById : (id) => axios.get(url + id),
            create : newRecord => axios.post(url,newRecord),
            update : (id,updateRecord) => axios.put(url + id, updateRecord),
            delete : (id) => axios.delete(url + id) 
        }
    }
}