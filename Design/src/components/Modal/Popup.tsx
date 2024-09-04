

type PopupProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const Popup = ({ onConfirm, onCancel }: PopupProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full">
        <div className="mb-4">
        <h1 className="text-lg font-semibold mb-4">Are you sure?</h1>
        </div>
        <div className="flex flex-col items-center">
        
          <p className="text-sm text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
          </p>
          <div className="flex justify-end space-x-2 mt-2">
            <button className="px-4 py-2 bg-gray-200 rounded-md" onClick={onCancel}>
              Close
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
