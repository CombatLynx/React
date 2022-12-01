import React from "react";
import { shallow } from "enzyme";
import DialogMessage from "./DialogMessage";

describe("DialogMessage", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DialogMessage />);
    expect(wrapper).toMatchSnapshot();
  });
});
