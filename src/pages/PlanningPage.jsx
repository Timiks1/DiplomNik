import DropdownTeachers from "../components/DropdownTeachers";
import { StatementsCard } from "../components/StatementsCard";

function PlanningPage() {
    return (
        <>
            <div className="p-10">
                <div className="pb-10">
                    <DropdownTeachers />
                </div>
                <StatementsCard />
            </div>
        </>
    )
}

export default PlanningPage;