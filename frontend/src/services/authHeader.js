export const authHeader = ()=>{
    let {token} = JSON.parse(localStorage.getItem('HomeChefUser'));
    return {
        "x-access-token":token
    };
}