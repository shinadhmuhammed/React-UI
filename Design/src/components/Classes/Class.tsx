import { classesData } from "@/Data/mockClassesData";
import UpcomingClasses from "./UpcomingClasses";



function Class() {
  return (
    <div>
      <UpcomingClasses classes={classesData} />
    </div>
  );
}

export default Class;
