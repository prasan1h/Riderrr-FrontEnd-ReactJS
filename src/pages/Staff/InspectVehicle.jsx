import StaffNav from "../../components/Staff/StaffNav";

const InspectVehicle = () => {
    return (
        <>
        <div className="bg-gray-100 py-4 flex flex-col ">
            <div>
        <StaffNav/>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-6">Inspect Vehicle</h1>
            <p className="text-gray-700 mb-4">Here you can inspect the vehicle details and verify the information provided by the seller.</p>
           
        </div>
        </div>
        </>
    )
}
export default InspectVehicle