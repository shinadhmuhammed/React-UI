import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ClassItem from "./ClassItem";
import { UpcomingClassesProps } from "../../Types/UpcomingClassesType";
import Pagination from "../Pagination/Pagination";

const UpcomingClasses = ({ classes }: UpcomingClassesProps) => {
  // State to manage the filter for booked only and manage the current page 
  const [bookedOnly, setBookedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const itemsPerPage = 6;
// Filter classes based on the bookedOnly state
  const filteredClasses = bookedOnly
    ? classes.filter((classData) => classData.isActive || classData.isLive)
    : classes;

    //Calculating the total number of pages
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentClasses = filteredClasses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Function to handle page changes for pagination
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
       {/* Main card container with dynamic background color based on darkMode */}
      <Card
        className={`max-w-3xl mx-auto mt-10 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <CardHeader className="flex flex-col space-y-1.5">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-semibold">
                Upcoming classes
              </CardTitle>
              <p className="text-sm text-gray-500">For next 7 days</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Dark Mode</span>
              <input
                type="checkbox"
                className="w-4 h-4 accent-blue-600 rounded border-blue-300 focus:ring-blue-500"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
            </div>
              {/* Booked only filter toggle */}
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
            <thead style={{ backgroundColor: darkMode ? "#333" : "#f5f5f5" }}>
              <tr className="text-left text-sm">
                <th className="pb-2 font-normal">Class name</th>
                <th className="pb-2 font-normal">Staff name</th>
                <th className="pb-2 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
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
    </div>
  );
};

export default UpcomingClasses;
