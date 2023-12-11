import { PropTypes } from 'prop-types';

const DetailsModalView = ({records}) => {

    const formatDecimal = (value) => {
        return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <dialog id="detailsModal" className="modal">
            <div className="modal-box">
                <h3 className="my-4 text-lg text-center">Detalles</h3>
                <form method="dialog">
                    <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                </form>
                <div className='px-4'>
                    <p><span className='text-fuchsia-400'>Id:</span> {records.employeeCode}</p>
                    <p><span className='text-fuchsia-400'>Corte:</span>{records.spreadSheetDate}</p>
                </div>
                <div className="my-4 text-center">
                    <h4 className="text-blue-600 ">Descuentos de ley</h4>
                    <ul>
                        <li>AFP: {formatDecimal(records.afpDiscountRate)}</li>
                        <li>ISSS: {formatDecimal(records.isssDiscountRate)}</li>
                        <li>ISR: {formatDecimal(records.rentDiscountRate)}</li>
                    </ul>
                    <h4 className="text-blue-600 ">Sueldo Neto</h4>
                    <p className="mt-4">Sueldo: {formatDecimal(records.netSalary)}</p>
                </div>
            </div>
        </dialog>
    )
}

DetailsModalView.propTypes = {
    records: PropTypes.shape({
        employeeCode: PropTypes.string.isRequired,
        spreadSheetDate: PropTypes.string.isRequired,
        afpDiscountRate: PropTypes.number.isRequired,
        isssDiscountRate: PropTypes.number.isRequired,
        rentDiscountRate: PropTypes.number.isRequired,
        netSalary: PropTypes.number.isRequired,
    }).isRequired,
};

export default DetailsModalView;