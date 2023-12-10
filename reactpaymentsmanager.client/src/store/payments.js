import {create} from 'zustand'

export const useDateForm = create(
    (set) => ({
        dateForm: null,
        setDateForm: (date) => set(() => ({dateForm: date})),
    })
)

