import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductList from "../components/ProductList";

// Mock SWR
jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useSWR from "swr";

const mockUseSWR = useSWR as jest.MockedFunction<typeof useSWR>;

describe("ProductList", () => {
  beforeEach(() => {
    mockUseSWR.mockClear();
  });

  it("renders loading state", () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      mutate: jest.fn(),
    });

    render(<ProductList />);
    expect(screen.getByText("FakeStore")).toBeInTheDocument();
    // Check for skeleton divs
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons).toHaveLength(5);
  });

  it("renders products", async () => {
    const mockProducts = [
      {
        id: 1,
        title: "Test Product",
        price: 10,
        image: "https://fakestoreapi.com/img/test.jpg",
        category: "test",
        description: "Test desc",
        rating: { rate: 4, count: 10 },
      },
    ];

    mockUseSWR.mockReturnValue({
      data: mockProducts,
      error: undefined,
      isLoading: false,
      mutate: jest.fn(),
    });

    render(<ProductList />);
    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });
  });

  it("handles sort toggle", async () => {
    const mockProducts = [
      { id: 1, title: "Cheap", price: 5, image: "https://fakestoreapi.com/img/cheap.jpg", category: "", description: "", rating: { rate: 4, count: 1 } },
      { id: 2, title: "Expensive", price: 15, image: "https://fakestoreapi.com/img/expensive.jpg", category: "", description: "", rating: { rate: 4, count: 1 } },
    ];

    mockUseSWR.mockReturnValue({
      data: mockProducts,
      error: undefined,
      isLoading: false,
      mutate: jest.fn(),
    });

    render(<ProductList />);
    const sortButton = screen.getByLabelText("Sort products by price ascending");

    fireEvent.click(sortButton);
    expect(sortButton).toHaveAttribute("aria-pressed", "false");
  });

  it("renders error state", () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      error: new Error("Test error"),
      isLoading: false,
      mutate: jest.fn(),
    });

    render(<ProductList />);
    expect(screen.getByText("Failed to load products. Please try again.")).toBeInTheDocument();
  });
});
