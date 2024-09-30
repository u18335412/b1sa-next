import { render, screen, fireEvent } from "@testing-library/react";
import { PuzzleSolver } from "./PuzzleSolver";
import { useSolvePuzzleMutation } from "@/hooks";
import { expect, vi } from "vitest";

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Stub the global ResizeObserver
vi.stubGlobal("ResizeObserver", ResizeObserverMock);

// Mock the hooks used in the component
vi.mock("@/hooks", () => ({
  useDebounce: (value: string) => value, // Mock debounce to return the value immediately
  useSolvePuzzleMutation: vi.fn(),
}));

describe("PuzzleSolver", () => {
  const mockTrigger = vi.fn();
  const mockUseSolvePuzzleMutation =
    useSolvePuzzleMutation as typeof mockTrigger;

  beforeEach(() => {
    mockUseSolvePuzzleMutation.mockReturnValue({
      data: null,
      trigger: mockTrigger,
      error: null,
      isMutating: false,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<PuzzleSolver />);
    expect(screen.getByText(/Please enter a random number word sequence/i));
  });

  it("handles input change", () => {
    render(<PuzzleSolver />);
    const textarea = screen.getByTestId(/sequence-input/i);

    fireEvent.change(textarea, { target: { value: "onetwothree" } });

    expect(textarea).toHaveValue("onetwothree");
  });

  it("shows error message for malformed input", async () => {
    render(<PuzzleSolver />);
    const textarea = screen.getByLabelText(/sequence/i);

    fireEvent.change(textarea, { target: { value: "abc" } });

    expect(
      await screen.findByText(/your input is malformed/i)
    ).toBeInTheDocument();
  });

  it("does not call trigger on submit when input is malformed", () => {
    render(<PuzzleSolver />);
    const textarea = screen.getByLabelText(/sequence/i);
    const button = screen.getByRole("button", { name: /solve puzzle/i });

    fireEvent.change(textarea, { target: { value: "abc" } });
    fireEvent.click(button);

    expect(mockTrigger).not.toHaveBeenCalled();
  });

  it("calls trigger with valid input", async () => {
    mockUseSolvePuzzleMutation.mockReturnValue({
      data: { wordSequence: "onetwothree", answer: [] },
      trigger: mockTrigger,
      error: null,
      isMutating: false,
    });

    render(<PuzzleSolver />);
    const textarea = screen.getByTestId(/sequence-input/i);
    const button = screen.getByRole("button", { name: /Solve puzzle/i });

    fireEvent.change(textarea, { target: { value: "onetwothree" } });
    fireEvent.click(button);

    expect(mockTrigger).toHaveBeenCalledWith("onetwothree", {});
  });

  it("displays error alert on error from mutation", async () => {
    mockUseSolvePuzzleMutation.mockReturnValue({
      data: null,
      trigger: mockTrigger,
      error: new Error("Some error"),
      isMutating: false,
    });

    render(<PuzzleSolver />);
    const textarea = screen.getByTestId(/sequence-input/i);
    const button = screen.getByRole("button", { name: /solve puzzle/i });

    fireEvent.change(textarea, { target: { value: "onetwothree" } });
    fireEvent.click(button);

    expect(
      await screen.findByText(/Error occurred while solving the puzzle/i)
    ).toBeInTheDocument();
  });

  it("shows the puzzle results when data is available", async () => {
    mockUseSolvePuzzleMutation.mockReturnValue({
      data: { wordSequence: "onetwothree", answer: [] },
      trigger: mockTrigger,
      error: null,
      isMutating: false,
    });

    render(<PuzzleSolver />);
    const textarea = screen.getByLabelText(/sequence/i);
    const button = screen.getByRole("button", { name: /solve puzzle/i });

    fireEvent.change(textarea, { target: { value: "onetwothree" } });
    fireEvent.click(button);

    expect(await screen.findByText(/puzzle results/i)).toBeInTheDocument();
    expect(screen.getByText(/word sequence:/i)).toHaveTextContent(
      "onetwothree"
    );
  });
});
