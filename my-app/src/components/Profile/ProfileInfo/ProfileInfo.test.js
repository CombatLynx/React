import React from "react";
import { shallow } from "enzyme";
import ProfileInfo from "./ProfileInfo";

describe("ProfileInfo", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ProfileInfo />);
    expect(wrapper).toMatchSnapshot();
  });
});
