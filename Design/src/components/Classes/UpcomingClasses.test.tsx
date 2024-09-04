import { render, screen, fireEvent } from "@testing-library/react";
import UpcomingClasses from "./UpcomingClasses";
import { classesDatasTest } from "@/Data/testClassesData";

describe("UpcomingClasses component", () => {
  test("renders correctly", () => {
    render(<UpcomingClasses classes={classesDatasTest} />);
    expect(screen.getByText(/Upcoming classes/i)).toBeInTheDocument();
    expect(screen.getByText(/For next 7 days/i)).toBeInTheDocument();
    expect(screen.getByText(/Class name/i)).toBeInTheDocument();
    expect(screen.getByText(/Staff name/i)).toBeInTheDocument();
    expect(screen.getByText(/Actions/i)).toBeInTheDocument();
  });
  test('filters classes correctly when "Booked only" checkbox is toggled', () => {
    render(<UpcomingClasses classes={classesDatasTest} />);

    // initial state: checkbox is unchecked
    expect(screen.getAllByRole("row")).toHaveLength(
      classesDatasTest.length + 1
    ); 

    // Toggle "Booked only" checkbox
    fireEvent.click(screen.getByRole("checkbox"));

    // Testing if only classes with isActive or isLive are displayed
    const filteredClasses = classesDatasTest.filter(
      (classData) => classData.isActive || classData.isLive
    );
    expect(screen.getAllByRole("row")).toHaveLength(filteredClasses.length + 1); 
  });
});
