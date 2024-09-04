import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ClassItem from "./ClassItem";
import { UpcomingClassesProps } from "../../Types/UpcomingClassesType";

// UpcomingClasses component displays list of upcoming classes, with an optional filter to show only booked classes
const UpcomingClasses = ({ classes }: UpcomingClassesProps) => {
  // useState hook to manage the 'bookedOnly' filter state
  const [bookedOnly, setBookedOnly] = useState(false);

  // Filter the classes based on whether the 'bookedOnly' checkbox is checked
  const filteredClasses = bookedOnly
    ? classes.filter((classData) => classData.isActive || classData.isLive)
    : classes;

  return (
    <Card className="max-w-3xl mx-auto mt-10">
      {/* cardHeader contains the title and the 'Booked only' checkbox */}
      <CardHeader className="flex flex-col space-y-1.5">
        <div className="flex justify-between items-center">
          <div>
            {/* Title of the section */}
            <CardTitle className="text-xl font-semibold">
              Upcoming classes
            </CardTitle>
            <p className="text-sm text-gray-500">For next 7 days</p>
          </div>
          {/* Checkbox to toggle the 'bookedOnly' filter */}
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Booked only</span>
            <input
              type="checkbox"
              className="w-4 h-4 accent-blue-600 rounded border-blue-300 focus:ring-blue-500"
              checked={bookedOnly}
              onChange={() => setBookedOnly(!bookedOnly)} // Toggle 'bookedOnly' state on change
            />
          </div>
        </div>
      </CardHeader>
      {/* CardContent contains the table  */}
      <CardContent>
        <table className="w-full">
          <thead style={{ backgroundColor: "#f5f5f5" }}>
            <tr className="text-left text-sm text-gray-700 ">
              <th className="pb-2 font-normal">Class name</th>
              <th className="pb-2 font-normal">Staff name</th>
              <th className="pb-2 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over filteredClasses and render a ClassItem component for each */}
            {filteredClasses.map((classData, index) => (
              <ClassItem key={index} index={index} classData={classData} />
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default UpcomingClasses;
