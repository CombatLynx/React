import React from "react";
import { shallow } from "enzyme";
import Content from "./Content";

describe("Content", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Content />);
    expect(wrapper).toMatchSnapshot();
  });
});
