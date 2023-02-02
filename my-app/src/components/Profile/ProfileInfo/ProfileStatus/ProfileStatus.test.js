import TestRenderer from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";
import React from "react";

test('test doubleClick status', () => {
    const testRenderer = TestRenderer.create(<ProfileStatus status="Hello"/>);
    const root = testRenderer.root;

    let span = root.findByType("span");
    span.props.onDoubleClick();

    let input = root.findByType("input");
    expect(input.props.value).toBe("Hello");
});