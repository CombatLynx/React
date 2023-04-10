import React from "react";
import { shallow } from "enzyme";
import NavbarFriends from "./NavbarFriends";

describe("NavbarFriends", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NavbarFriends  name={"Misha"}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
