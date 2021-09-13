import {useAuthContext} from "../AuthorizationContext";

export const useJwt = () => useAuthContext().jwt;
