import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

describe('Ana Sayfa ("/" Rota)', () => {
  it("başlığı ve butonları doğru şekilde render etmelidir", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { name: /konumlar/i });
    expect(heading).toBeInTheDocument();

    const routeButton = screen.getByRole("button", { name: /rota göster/i });
    expect(routeButton).toBeInTheDocument();

    const addButton = screen.getByRole("button", { name: /konum ekle/i });
    expect(addButton).toBeInTheDocument();
  });

  it("hiç konum eklenmediğinde uyarı mesajını göstermelidir", () => {
    render(<Home />);

    const noLocationText = screen.getByText(/henüz hiç konum eklenmedi/i);
    expect(noLocationText).toBeInTheDocument();
  });
});
