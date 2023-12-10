import DateFormSearch from "../components/payments/DateFormSearch"

const PaymentsSearch = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-sm shadow-2xl card bg-base-100">
                <DateFormSearch/>
            </div>
        </div>
    )
}

export default PaymentsSearch