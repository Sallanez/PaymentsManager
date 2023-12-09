import {create} from 'zustand'
import {persist,createJSONStorage} from "zustand/middleware"

export const useUserCredencials = create(
    persist(
        (set) => ({
            userCredencials: null,
            userIsAuthenticated: false,
            userRole: null,
            setUserIsAuthenticated: (userIsAuthenticated) => set(() => ({userIsAuthenticated})),
            setUserRole: (userRole) => set(() => ({userRole})),
            setUserCredencials: (userCredencials) => set(() => ({userCredencials})),
        }),
        {
            name: 'userCredencials',
            storage: createJSONStorage(()=> localStorage),
        }
    )
);
