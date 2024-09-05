import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Popup from "../Modal/Popup";
import { ClassItemProps } from "./../../Types/ClassItemType";
import { toast, Toaster } from 'sonner';

const ClassItem = ({ index, classData }: ClassItemProps) => {
  //state method for managing the popup and timer.
  const [showPopup, setShowPopup] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);

  //  To handle the countdown timer logic.
  useEffect(() => {
    let interval: number | NodeJS.Timeout;

    if (timer !== null) {
      interval = setInterval(() => {
        setTimer((prev) => (prev && prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);
  //Function that trigger when click book now button
  const handleBookNowClick = () => {
    setShowPopup(true);
  };
  //Funtion to handle the confirm action
  const handleConfirm = () => {
    setShowPopup(false);
    setTimer(1800); 
    toast.success('Booking confirmed! You can join the class in 30 minutes.');
  };
  //Function to handle the cancel action
  const handleCancel = () => {
    setShowPopup(false);
  };
  // Book now button should be disabled based on the timer
  const isButtonDisabled = timer !== null && timer > 0;

  return (
    <>
    <Toaster position="top-right" richColors />
      {/* Render the popup if showPopup is true */}
      {showPopup && <Popup onConfirm={handleConfirm} onCancel={handleCancel} />}
      <tr className="border-t border-gray-200">
        <td className="py-4 pr-4">
          <div className="flex items-center">
            <span className="w-6 text-gray-500 font-medium">{index + 1}</span>
            <div>
              <h3 className="font-medium flex items-center">
                {classData.name}
              </h3>
              <p className="text-sm text-gray-500 flex items-center space-x-2">
                {classData.isLive && (
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                    <span className="text-red-500 text-sm font-medium">
                      Live
                    </span>
                  </span>
                )}
                <span>{classData.date}</span>
              </p>
            </div>
          </div>
        </td>
        <td className="py-4 pr-4">
          <div className="flex items-center">
            <img
              src={classData.staffImage}
              alt={classData.staffName}
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <p className="font-medium">{classData.staffName}</p>
              <p className="text-sm text-gray-500">Additional details</p>
            </div>
          </div>
        </td>
        <td className="py-4">
          <div className="flex items-end space-y-2">
            {/* Render 'Join now' button if action is 'Join now' */}
            {classData.action === "Join now" && (
              <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md flex items-center space-x-2">
                <span>Join now</span>
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </button>
            )}
            {/* Display countdown timer if `countdown` is present */}
            {classData.countdown && (
              <div className="flex items-center space-x-2 text-sm font-medium">
                <span className="text-blue-600 text-lg">
                  {classData.countdown}
                </span>
                <ClockIcon className="w-5 h-7 text-blue-600" />
              </div>
            )}
            {/* Show days left if `daysLeft` is defined */}
            {classData.daysLeft !== undefined && (
              <div className="flex items-center space-x-2">
                <span className="text-base font-semibold text-gray-500">
                  {classData.daysLeft} days
                </span>
                <ClockIcon className="w-5 h-7 text-gray-600 font-semibold" />
              </div>
            )}
            {/* Render 'Book now' button if action is 'Book now' */}
            {classData.action === "Book now" && (
              <button
                onClick={handleBookNowClick}
                disabled={isButtonDisabled} // Disable button if timer is active
                className="px-4 py-2 border border-black text-gray-800 hover:bg-gray-300 text-sm font-semibold rounded-md bg-transparent"
              >
                Book now
              </button>
            )}
          </div>
          {/* Display the timer*/}
          {timer && (
            <div className="text-sm text-red-600 mt-2">
              Timer: {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default ClassItem;
