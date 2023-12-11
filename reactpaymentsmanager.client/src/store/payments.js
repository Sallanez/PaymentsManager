import {create} from 'zustand'

export const useDateForm = create(
    (set) => ({
        dateForm: null,
        setDateForm: (date) => set(() => ({dateForm: date})),

    })
)

export const useRecords = create(
    (set) => ({
        paymentRecords: [],
        filteredPaymentRecords: [],
        setPaymentRecords: (records) => set(() => ({paymentRecords: records})),
        setFilteredPaymentRecords: (records) => set(() => ({filteredPaymentRecords: records})),
    })
);