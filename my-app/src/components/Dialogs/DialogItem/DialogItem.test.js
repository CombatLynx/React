import React from "react";
import { shallow } from "enzyme";
import DialogItem from "./DialogItem";

describe("DialogItem", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DialogItem />);
    expect(wrapper).toMatchSnapshot();
  });
});
