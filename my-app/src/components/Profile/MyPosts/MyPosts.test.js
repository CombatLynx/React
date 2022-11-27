import React from "react";
import { shallow } from "enzyme";
import MyPosts from "./MyPosts";

describe("MyPosts", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MyPosts />);
    expect(wrapper).toMatchSnapshot();
  });
});
