import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import PostComments from "."; // Importo o componente

//mock 3 comments   
const comments = ["Primeiro comentário", "Segundo comentário", "Terceiro comentário"];

describe("Comments", () => {
    test("Comment form exists", () => {
        render(<PostComments />);
        const commentArea = screen.getByTestId("post-comments");
        expect(commentArea).toBeInTheDocument();
    });

    test("Should add a comment", () => {
        render(<PostComments />);
        const commentTextarea = screen.getByRole("textbox");
        fireEvent.change(commentTextarea, {
            target: { value: "First comment" },
        });
        expect(commentTextarea).toHaveValue("First comment");
        const submitButton = screen.getByRole("button", { name: /comentar/i });
        fireEvent.click(submitButton);
        expect(screen.getByText("First comment")).toBeInTheDocument();
    });

    test("Should add three comments", () => {
        render(<PostComments />);
        const commentTextarea = screen.getByRole("textbox");
        comments.forEach((comment) => {
            fireEvent.change(commentTextarea, {
                target: { value: comment },
            });
            fireEvent.click(screen.getByRole("button", { name: /comentar/i }));
            expect(screen.getByText(comment)).toBeInTheDocument();
        });
    });
});