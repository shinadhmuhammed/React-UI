import { render, screen, fireEvent } from "@testing-library/react";
import ClassItem from "./ClassItem";
import { classesDatasTest } from "@/Data/testClassesData";

describe('ClassItem Component', () => {
    classesDatasTest.forEach((classData, index) => {
        test('renders ClassItem correctly', () => {
            render(
                <table>
                    <tbody>
                        <ClassItem classData={classData} index={index} />
                    </tbody>
                </table>
            );

            if (classData.action === "Book now") {
                const bookNowButton = screen.getByText(/Book now/i);
                fireEvent.click(bookNowButton);

                // Checking if popup appears
                expect(screen.getByText(/Confirm/i)).toBeInTheDocument();
                expect(screen.getByText(/Close/i)).toBeInTheDocument();
            }
        });
    });

    test('shows timer correctly', () => {
        render(
            <table>
                <tbody>
                    <ClassItem classData={classesDatasTest[1]} index={1} />
                </tbody>
            </table>
        );
        // Testing if countdown value is in the document or not
        expect(screen.getByText(/2:40/i)).toBeInTheDocument(); 
    });
});
