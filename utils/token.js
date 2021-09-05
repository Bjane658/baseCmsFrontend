import jwt from 'jsonwebtoken';

export const getTokenFromBearer = (bearer) => {
    if(bearer){
        return bearer.split(" ")[1];
    }
    return undefined;
};

export const uidFromToken = (token) => {
    const decoded = decodeToken(token);
    return decoded.id;
};

export const uidFromBearerToken = (bearer) => {
    const decoded = decodeBearerToken(bearer);
    return decoded.id;
};


export const decodeBearerToken = (bearer) => {
    const token = getTokenFromBearer(bearer);
    return decodeToken(token);
};

export const isBearerToken = (bearer) => {
    const token = getTokenFromBearer(bearer);
    return isToken(token);
}

export const decodeToken = (token) => {
    try{
        const t = jwt.decode(token);
        return t;
    }catch (error) {
        console.log("unvalid token: ", error);
        return undefined;
    }
};

export const isToken = (token) => {
    const decoded = decodeToken(token);
    return !!decoded;
};