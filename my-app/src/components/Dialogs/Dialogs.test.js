import React from "react";
import { shallow } from "enzyme";
import Dialogs from "./Dialogs";

describe("Dialogs", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Dialogs />);
    expect(wrapper).toMatchSnapshot();
  });
});
