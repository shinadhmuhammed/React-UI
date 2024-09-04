import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Popup from "../Modal/Popup";

type ClassItemProps = {
  index: number;
  classData: {
    name: string;
    date: string;
    staffName: string;
    staffImage: string;
    action?: string;
    countdown?: string;
    daysLeft?: number;
    isLive?: boolean;
    isActive?: boolean;
  };
};

const ClassItem = ({ index, classData }: ClassItemProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    let interval: number | NodeJS.Timeout;

    if (timer !== null) {
      interval = setInterval(() => {
        setTimer((prev) => (prev && prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleBookNowClick = () => {
    setShowPopup(true);
  };

  const handleConfirm = () => {
    setShowPopup(false);
    setTimer(1800);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const isButtonDisabled = timer !== null && timer > 0;

  return (
    <>
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
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                    <span className="text-red-500 text-sm font-medium">
                      Live
                    </span>
                  </div>
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
            {classData.action === "Join now" && (
              <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md flex items-center space-x-2">
                <span>Join now</span>
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </button>
            )}
            {classData.countdown && (
              <div className="flex items-center space-x-2 text-sm font-medium">
                <span className="text-blue-600 text-lg">
                  {classData.countdown}
                </span>
                <ClockIcon className="w-5 h-7 text-blue-600" />
              </div>
            )}
            {classData.daysLeft !== undefined && (
              <div className="flex items-center space-x-2">
                <span className="text-base font-semibold text-gray-500">
                  {classData.daysLeft} days
                </span>
                <ClockIcon className="w-5 h-7 text-gray-600 font-semibold" />
              </div>
            )}
            {classData.action === "Book now" && (
              <button
                onClick={handleBookNowClick}
                disabled={isButtonDisabled}
                className="px-4 py-2 border border-black text-gray-800 text-sm font-semibold rounded-md bg-transparent"
              >
                Book now
              </button>
            )}
          </div>
          {timer && (
            <div className="text-sm text-red-600 mt-2">
              Timer: {Math.floor(timer / 60)}:{('0' + timer % 60).slice(-2)}
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default ClassItem;
