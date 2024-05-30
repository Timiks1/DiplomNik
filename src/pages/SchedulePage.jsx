import Calendar from "../components/Calendar";
import DropdownCourses from "../components/DropdownCourse";

function SchedulePage() {
    return (
        <>
            <div className="p-10">
                <div className="pb-10">
                    <DropdownCourses />
                    <Calendar />
                </div>
            </div>
        </>
    )
}

export default SchedulePage;