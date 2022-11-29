import React from "react";
import { shallow } from "enzyme";
import Music from "./Music";

describe("Music", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Music />);
    expect(wrapper).toMatchSnapshot();
  });
});
