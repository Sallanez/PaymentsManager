import {create} from 'zustand'

export const useSpreedSheetFiles = create(
    (set) => ({
        spreedSheetFiles: [],
        addSpreadSheetFile: (file) => set((state) => ({spreedSheetFiles: [...state.spreedSheetFiles,file]})),
        setSpreedSheetFiles: (file) => set(() => ({spreedSheetFiles: [...file]})),
    })
)

