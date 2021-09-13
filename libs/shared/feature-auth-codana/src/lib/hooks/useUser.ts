import { User } from '../../types';
import {useAuthContext} from "../AuthorizationContext";

export const useUser = (): User => useAuthContext().user;
