import React from "react";
import TestRenderer from "react-test-renderer";
import PaginationUsers from "./PaginationUsers";

test('pagination users', () => {
    const testRenderer = TestRenderer.create(<PaginationUsers portionSize={10} pageSize={1} totalUsersCount={10}/>);
    const root = testRenderer.root;

    let spans = root.findAllByType("span");
    expect(spans.length).toBe(10);
});