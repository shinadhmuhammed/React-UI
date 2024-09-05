import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ClassItem from "./ClassItem";
import { UpcomingClassesProps } from "../../Types/UpcomingClassesType";
import Pagination from "../Pagination/Pagination";

const UpcomingClasses = ({ classes }: UpcomingClassesProps) => {
  // useState hook to manage the 'bookedOnly' filter state
  const [bookedOnly, setBookedOnly] = useState(false);

  // useState hook to manage current page and items per page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter the classes based on whether the 'bookedOnly' checkbox is checked
  const filteredClasses = bookedOnly
    ? classes.filter((classData) => classData.isActive || classData.isLive)
    : classes;

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentClasses = filteredClasses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handler to change the page
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto mt-10">
      {/* cardHeader contains the title and the 'Booked only' checkbox */}
      <CardHeader className="flex flex-col space-y-1.5">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold">
              Upcoming classes
            </CardTitle>
            <p className="text-sm text-gray-500">For next 7 days</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Booked only</span>
            <input
              type="checkbox"
              className="w-4 h-4 accent-blue-600 rounded border-blue-300 focus:ring-blue-500"
              checked={bookedOnly}
              onChange={() => {
                setBookedOnly(!bookedOnly);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <table className="w-full">
          <thead style={{ backgroundColor: "#f5f5f5" }}>
            <tr className="text-left text-sm text-gray-700">
              <th className="pb-2 font-normal">Class name</th>
              <th className="pb-2 font-normal">Staff name</th>
              <th className="pb-2 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over currentClasses and render a ClassItem component for each */}
            {currentClasses.map((classData, index) => (
              <ClassItem
                key={index}
                index={startIndex + index}
                classData={classData}
              />
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </CardContent>
    </Card>
  );
};

export default UpcomingClasses;
